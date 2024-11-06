const Imap = require("imap");
var EmailReplyParser = require("email-reply-parser");

import { GoogleAuth } from "google-auth-library";
import { prisma } from "../prisma";

const { simpleParser } = require("mailparser");

require("dotenv").config();

const client = prisma;

const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
//@ts-ignore
const d = new Date([year, month, today]);

// Function to get or refresh the access token
async function getValidAccessToken(queue: any) {
  const {
    clientId,
    clientSecret,
    refreshToken,
    accessToken,
    expiresIn,
    username,
  } = queue;

  // Check if token is still valid
  const now = Math.floor(Date.now() / 1000);
  if (accessToken && expiresIn && now < expiresIn) {
    return accessToken;
  }

  // Initialize GoogleAuth client
  const auth = new GoogleAuth({
    clientOptions: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
  });

  const oauth2Client = auth.fromJSON({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  // Refresh the token if expired
  const tokenInfo = await oauth2Client.getAccessToken();

  const expiryDate = queue.expiresIn + 3600;

  if (tokenInfo.token) {
    await prisma.emailQueue.update({
      where: { id: queue.id },
      data: {
        accessToken: tokenInfo.token,
        expiresIn: expiryDate,
      },
    });
    return tokenInfo.token;
  } else {
    throw new Error("Unable to refresh access token.");
  }
}

// Function to generate XOAUTH2 string
function generateXOAuth2Token(user: string, accessToken: string) {
  const authString = [
    "user=" + user,
    "auth=Bearer " + accessToken,
    "",
    "",
  ].join("\x01");
  return Buffer.from(authString).toString("base64");
}

async function returnImapConfig(queue: any) {
  switch (queue.serviceType) {
    case "gmail":
      const validatedAccessToken = await getValidAccessToken(queue);
      return {
        user: queue.username,
        host: queue.hostname,
        port: 993,
        tls: true,
        xoauth2: generateXOAuth2Token(queue.username, validatedAccessToken),
        tlsOptions: { rejectUnauthorized: false, servername: queue.hostname },
      };
    case "other":
      return {
        user: queue.username,
        password: queue.password,
        host: queue.hostname,
        port: queue.tls ? 993 : 143,
        tls: queue.tls,
        tlsOptions: { rejectUnauthorized: false, servername: queue.hostname },
      };
    default:
      throw new Error("Unsupported service type");
  }
}

export const getEmails = async () => {
  try {
    const queues = await client.emailQueue.findMany({});

    for (let i = 0; i < queues.length; i++) {
      var imapConfig = await returnImapConfig(queues[i]);

      if (!imapConfig) {
        continue;
      }

      const imap = new Imap(imapConfig);
      imap.connect();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, () => {
          imap.search(["UNSEEN", ["ON", [date]]], (err: any, results: any) => {
            if (err) {
              console.log(err);
              return;
            }

            if (!results || !results.length) {
              console.log("No new messages");
              imap.end();
              return;
            }

            console.log(results.length + " num of emails");

            const f = imap.fetch(results, { bodies: "" });
            f.on("message", (msg: any) => {
              msg.on("body", (stream: any) => {
                simpleParser(stream, async (err: any, parsed: any) => {
                  const { from, subject, textAsHtml, text, html } = parsed;

                  var reply_text = new EmailReplyParser().read(text);

                  if (subject?.includes("Re:")) {
                    const ticketIdMatch = subject.match(/#(\d+)/);
                    if (!ticketIdMatch) {
                      console.log(
                        "Could not extract ticket ID from subject:",
                        subject
                      );
                      return;
                    }

                    const ticketId = ticketIdMatch[1];

                    const find = await client.ticket.findFirst({
                      where: {
                        Number: Number(ticketId),
                      },
                    });

                    if (find) {
                      return await client.comment.create({
                        data: {
                          text: text
                            ? reply_text.fragments[0]._content
                            : "No Body",
                          userId: null,
                          ticketId: find.id,
                          reply: true,
                          replyEmail: from.value[0].address,
                          public: true,
                        },
                      });
                    } else {
                      console.log("Ticket not found");
                    }
                  } else {
                    const imap = await client.imap_Email.create({
                      data: {
                        from: from.value[0].address,
                        subject: subject ? subject : "No Subject",
                        body: text ? text : "No Body",
                        html: html ? html : "",
                        text: textAsHtml,
                      },
                    });

                    const ticket = await client.ticket.create({
                      data: {
                        email: from.value[0].address,
                        name: from.value[0].name,
                        title: imap.subject ? imap.subject : "-",
                        isComplete: Boolean(false),
                        priority: "Low",
                        fromImap: Boolean(true),
                        detail: html ? html : textAsHtml,
                      },
                    });

                    console.log(imap, ticket);
                  }
                });
              });
              msg.once("attributes", (attrs: any) => {
                const { uid } = attrs;
                imap.addFlags(uid, ["\\Seen"], () => {
                  // Mark the email as read after reading it
                  console.log("Marked as read!");
                });
              });
            });
            f.once("error", (ex: any) => {
              return Promise.reject(ex);
            });
            f.once("end", () => {
              console.log("Done fetching all messages!");
              imap.end();
            });
          });
        });
      });

      imap.once("error", (err: any) => {
        console.log(err);
      });

      imap.once("end", () => {
        console.log("Connection ended");
      });
    }

    console.log("loop completed");
  } catch (error) {
    console.log("an error occurred ", error);
  }
};

// Helper function to extract reply text
function extractReplyText(emailBody: string): string {
  // Implement logic to extract reply text from the email body
  // This might involve removing quoted text from previous emails
  return emailBody; // Placeholder, replace with actual logic
}
