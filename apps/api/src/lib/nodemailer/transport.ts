import { prisma } from "../../prisma";

const nodemailer = require("nodemailer");
const { google } = require("google-auth-library");
const { ConfidentialClientApplication } = require("@azure/identity");

// Environment variables or configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const TENANT_ID = process.env.TENANT_ID;

export async function createTransportProvider() {
  const provider = await prisma.email.findFirst({});

  if (CLIENT_ID && CLIENT_SECRET && (REFRESH_TOKEN || TENANT_ID)) {
    // OAuth2 configuration
    if (EMAIL_SERVICE === "gmail") {
      // Gmail
      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      const accessToken = await oAuth2Client.getAccessToken();

      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: EMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });
    } else if (EMAIL_SERVICE === "microsoft") {
      // Microsoft
      const cca = new ConfidentialClientApplication({
        auth: {
          clientId: CLIENT_ID,
          authority: `https://login.microsoftonline.com/${TENANT_ID}`,
          clientSecret: CLIENT_SECRET,
        },
      });

      const result = await cca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"],
      });

      return nodemailer.createTransport({
        service: "hotmail",
        auth: {
          type: "OAuth2",
          user: EMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          accessToken: result.accessToken,
        },
      });
    }
  } else if (EMAIL_USER && EMAIL_PASS) {
    // Username/password configuration
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  } else {
    throw new Error("No valid authentication method configured.");
  }
}
