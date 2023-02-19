// import express from "express";
// import Imap from "imap";
// import { simpleParser } from "mailparser";
// import { PrismaClient } from "database";

const express = require("express");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

const { PrismaClient } = require('database')

const client = new PrismaClient();

require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

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
                const { from, subject, textAsHtml, text, html } = parsed;
                console.log(from, subject, textAsHtml, text, html);

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

                console.log(imap);
              });
            });
            // msg.once("attributes", (attrs) => {
            //   const { uid } = attrs;
            //   imap.addFlags(uid, ["\\Seen"], () => {
            //     // Mark the email as read after reading it
            //     console.log("Marked as read!");
            //   });
            // });
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
