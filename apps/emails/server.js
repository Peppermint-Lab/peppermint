const express = require("express");
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { PrismaClient } = require("database");

require("dotenv").config();

const client = new PrismaClient();
const app = express();
const PORT = 5001;

app.use(express.json());

app.listen(PORT, console.log(`Server running on port ${PORT}`));

const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const d = new Date([year, month, today]);

const getEmails = async () => {
  console.log(date, d);
  try {
    const queues = await client.emailQueue.findMany({});

    for (let i = 0; i < queues.length; i++) {
      var imapConfig = {
        user: queues[i].username,
        password: queues[i].password,
        host: queues[i].hostname,
        port: 993,
        tls: true,
        tlsOptions: { servername: queues[i].hostname },
      };

      const imap = new Imap(imapConfig);
      imap.connect();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, () => {
          imap.search(["UNSEEN", ["ON", [date]]], (err, results) => {
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
            f.on("message", (msg) => {
              msg.on("body", (stream) => {
                simpleParser(stream, async (err, parsed) => {
                  const { from, subject, textAsHtml, text, html } = parsed;
                  // console.log(from, subject, textAsHtml, text, html);

                  const imap = await client.imap_Email.create({
                    data: {
                      from: from.text,
                      subject: subject ? subject : "No Subject",
                      body: text ? text : "No Body",
                      html: html ? html : "",
                      text: textAsHtml,
                    },
                  });

                  const ticket = await client.ticket.create({
                    data: {
                      email: imap.from,
                      name: imap.from,
                      title: imap.subject ? imap.subject : "-",
                      isComplete: Boolean(false),
                      priority: "Low",
                      fromImap: Boolean(true),
                      detail: text,
                    },
                  });

                  console.log(imap, ticket);
                });
              });
              msg.once("attributes", (attrs) => {
                const { uid } = attrs;
                imap.addFlags(uid, ["\\Seen"], () => {
                  // Mark the email as read after reading it
                  console.log("Marked as read!");
                });
              });
            });
            f.once("error", (ex) => {
              return Promise.reject(ex);
            });
            f.once("end", () => {
              console.log("Done fetching all messages!");
              imap.end();
            });
          });
        });
      });

      imap.once("error", (err) => {
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

setInterval(getEmails, 10000);
