const Imap = require("imap");
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

export const getEmails = async () => {
  try {
    const queues = await client.emailQueue.findMany({});

    for (let i = 0; i < queues.length; i++) {
      var imapConfig = {
        user: queues[i].username,
        password: queues[i].password,
        host: queues[i].hostname,
        port: queues[i].tls ? 993 : 110,
        tls: queues[i].tls,
        tlsOptions: { servername: queues[i].hostname },
      };

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

                  console.log("from", from);

                  // const parsedData = parseEmailContent(textAsHtml);

                  if (subject !== undefined && subject.includes("Re:")) {
                    return await client.comment.create({
                      data: {
                        text: text ? text : "No Body",
                        userId: null,
                        ticketId: subject.split(" ")[1].split("#")[1],
                      },
                    });
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
