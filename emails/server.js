const express = require("express");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Check mailbox every 5 minutes for new emails, and mark them as read when dealt with

const date = new Date(["2023", "02", "16"]);

var imapConfig = {
  user: process.env.username,
  password: process.env.password,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { servername: "imap.gmail.com" },
};

const getEmails = () => {
  try {
    console.log(date);
    const imap = new Imap(imapConfig);
    imap.connect();

    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        imap.search(["UNSEEN", ["ON", date]], (err, results) => {
          if (err) {
            console.log(err);
            return;
          }

          if (!results || !results.length) {
            console.log("No new messages");
            imap.end();
            return;
          }

          const f = imap.fetch(results, { bodies: "" });
          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, async (err, parsed) => {
                console.log(parsed);
                const { from, subject, textAsHtml, text, html } = parsed;
                console.log(from, subject, textAsHtml, text, html);

                // Connect to primary database and insert the email into the database
                // Link Email to ticket
                // Create a new ticket using subject as title & text as description


                
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
