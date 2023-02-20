const express = require("express");
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { PrismaClient } = require("database");

require("dotenv").config();

const client = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.listen(PORT, console.log(`Server running on port ${PORT}`));

const date = new Date(["2023", "02", "19"]);
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const d = new Date([year, month, today]);

var imapConfig = {
  user: process.env.username,
  password: process.env.password,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { servername: "imap.gmail.com" },
};

console.log(date, d);

const getEmails = () => {
  try {
    const imap = new Imap(imapConfig);
    imap.connect();

    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        imap.search(["UNSEEN", ["ON", [d]]], (err, results) => {
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

                // Connect to primary database and insert the email into the database
                // Link Email to ticket
                // Create a new ticket using subject as title & text as description

                const imap = await client.imap_Email.create({
                  data: {
                    from: from.text,
                    subject: subject ? subject : "No Subject",
                    body: text ? text : "No Body",
                    html: html,
                    text: textAsHtml,
                  },
                });

                const ticket = await client.ticket.create({
                  data: {
                    email: imap.from,
                    name: imap.from,
                    title: imap.subject ? imap.subject : "-",
                    isComplete: Boolean(false),
                    priority: "low",
                    fromImap: Boolean(true),
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
  } catch (ex) {
    console.log("an error occurred");
  }
};

setInterval(getEmails, 10000);
