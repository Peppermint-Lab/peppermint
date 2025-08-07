import EmailReplyParser from "email-reply-parser";
import Imap from "imap";
import { simpleParser } from "mailparser";
import { prisma } from "../../prisma";
import { EmailConfig, EmailQueue } from "../types/email";
import { AuthService } from "./auth.service";

function getReplyText(email: any): string {
  const parsed = new EmailReplyParser().read(email.text);
  const fragments = parsed.getFragments();

  let replyText = "";

  fragments.forEach((fragment: any) => {
    console.log("FRAGMENT", fragment._content, fragment.content);
    if (!fragment._isHidden && !fragment._isSignature && !fragment._isQuoted) {
      replyText += fragment._content;
    }
  });

  return replyText;
}

export class ImapService {
  private static async getImapConfig(queue: EmailQueue): Promise<EmailConfig> {
    switch (queue.serviceType) {
      case "gmail": {
        const validatedAccessToken = await AuthService.getValidAccessToken(
          queue
        );

        return {
          user: queue.username,
          host: queue.hostname,
          port: 993,
          tls: true,
          xoauth2: AuthService.generateXOAuth2Token(
            queue.username,
            validatedAccessToken
          ),
          tlsOptions: { rejectUnauthorized: false, servername: queue.hostname },
        };
      }
      case "other":
        return {
          user: queue.username,
          password: queue.password,
          host: queue.hostname,
          port: queue.tls ? 993 : 143,
          tls: queue.tls || false,
          tlsOptions: { rejectUnauthorized: false, servername: queue.hostname },
        };
      default:
        throw new Error("Unsupported service type");
    }
  }

  private static async processEmail(
    parsed: any,
    isReply: boolean
  ): Promise<void> {
    const { from, subject, text, html, textAsHtml } = parsed;

    console.log("isReply", isReply);

    if (isReply) {
      // First try to match UUID format
      const uuidMatch = subject.match(
        /(?:ref:|#)([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
      );
      console.log("UUID MATCH", uuidMatch);

      const ticketId = uuidMatch?.[1];

      console.log("TICKET ID", ticketId);

      if (!ticketId) {
        throw new Error(`Could not extract ticket ID from subject: ${subject}`);
      }

      const ticket = await prisma.ticket.findFirst({
        where: {
          id: ticketId,
        },
      });

      console.log("TICKET", ticket);

      if (!ticket) {
        throw new Error(`Ticket not found: ${ticketId}`);
      }

      const replyText = getReplyText(parsed);

      await prisma.comment.create({
        data: {
          text: text ? replyText : "No Body",
          userId: null,
          ticketId: ticket.id,
          reply: true,
          replyEmail: from.value[0].address,
          public: true,
        },
      });
    } else {
      const imapEmail = await prisma.imap_Email.create({
        data: {
          from: from.value[0].address,
          subject: subject || "No Subject",
          body: text || "No Body",
          html: html || "",
          text: textAsHtml,
        },
      });

      await prisma.ticket.create({
        data: {
          email: from.value[0].address,
          name: from.value[0].name,
          title: imapEmail.subject || "-",
          isComplete: false,
          priority: "low",
          fromImap: true,
          detail: html || textAsHtml,
        },
      });
    }
  }

  static async fetchEmails(): Promise<void> {
    const queues =
      (await prisma.emailQueue.findMany()) as unknown as EmailQueue[];
    const today = new Date();

    for (const queue of queues) {
      try {
        const imapConfig = await this.getImapConfig(queue);

        if (queue.serviceType === "other" && !imapConfig.password) {
          console.error("IMAP configuration is missing a password");
          throw new Error("IMAP configuration is missing a password");
        }

        // @ts-ignore
        const imap = new Imap(imapConfig);

        await new Promise((resolve, reject) => {
          imap.once("ready", () => {
            imap.openBox("INBOX", false, (err) => {
              if (err) {
                reject(err);
                return;
              }
              imap.search(["UNSEEN", ["ON", today]], (err, results) => {
                if (err) reject(err);
                if (!results?.length) {
                  console.log("No new messages");
                  imap.end();
                  resolve(null);
                  return;
                }

                const fetch = imap.fetch(results, { bodies: "" });

                fetch.on("message", (msg) => {
                  msg.on("body", (stream) => {
                    simpleParser(stream, async (err, parsed) => {
                      if (err) throw err;
                      const subjectLower = parsed.subject?.toLowerCase() || "";
                      const isReply =
                        subjectLower.includes("re:") ||
                        subjectLower.includes("ref:");
                      await this.processEmail(parsed, isReply || false);
                    });
                  });

                  msg.once("attributes", (attrs) => {
                    imap.addFlags(attrs.uid, ["\\Seen"], () => {
                      console.log("Marked as read!");
                    });
                  });
                });

                fetch.once("error", reject);
                fetch.once("end", () => {
                  console.log("Done fetching messages");
                  imap.end();
                  resolve(null);
                });
              });
            });
          });

          imap.once("error", reject);
          imap.once("end", () => {
            console.log("Connection ended");
            resolve(null);
          });

          imap.connect();
        });
      } catch (error) {
        console.error(`Error processing queue ${queue.id}:`, error);
      }
    }
  }
}
