import { prisma } from "../../prisma";

const nodemailer = require("nodemailer");
const { google } = require("google-auth-library");
const { ConfidentialClientApplication } = require("@azure/identity");

export async function createTransportProvider() {
  const provider = await prisma.email.findFirst({});

  if (!provider) {
    throw new Error("No email provider configured.");
  }

  if (
    provider?.clientId &&
    provider?.clientSecret &&
    (provider?.refreshToken || provider?.tenantId)
  ) {
    // OAuth2 configuration
    if (provider?.serviceType === "gmail") {
      // Gmail
      const oAuth2Client = new google.auth.OAuth2(
        provider?.clientId,
        provider?.clientSecret
      );
      oAuth2Client.setCredentials({ refresh_token: provider?.refreshToken });
      const accessToken = await oAuth2Client.getAccessToken();

      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: provider?.user,
          clientId: provider?.clientId,
          clientSecret: provider?.clientSecret,
          refreshToken: provider?.refreshToken,
          accessToken: accessToken.token,
        },
      });
    } else if (provider?.serviceType === "microsoft") {
      // Microsoft
      const cca = new ConfidentialClientApplication({
        auth: {
          clientId: provider?.clientId,
          authority: `https://login.microsoftonline.com/${provider?.tenantId}`,
          clientSecret: provider?.clientSecret,
        },
      });

      const result = await cca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"],
      });

      return nodemailer.createTransport({
        service: "hotmail",
        auth: {
          type: "OAuth2",
          user: provider?.user,
          clientId: provider?.clientId,
          clientSecret: provider?.clientSecret,
          accessToken: result.accessToken,
        },
      });
    }
  } else if (provider?.user && provider?.pass) {
    // Username/password configuration
    return nodemailer.createTransport({
      service: provider?.serviceType,
      auth: {
        user: provider?.user,
        pass: provider?.pass,
      },
    });
  } else {
    throw new Error("No valid authentication method configured.");
  }
}
