// Check Github Version
// Add outbound email provider
// Email Verification
// SSO Provider
// Portal Locale
// Feature Flags
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Client } from "google-auth-library";
const nodemailer = require("nodemailer");

import { track } from "../lib/hog";
import { createTransportProvider } from "../lib/nodemailer/transport";
import { requirePermission } from "../lib/roles";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

async function tracking(event: string, properties: any) {
  const client = track();

  client.capture({
    event: event,
    properties: properties,
    distinctId: "uuid",
  });
}

export function configRoutes(fastify: FastifyInstance) {
  // Check auth method
  fastify.get(
    "/api/v1/config/authentication/check",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const config = await prisma.config.findFirst();

      //@ts-expect-error
      const { sso_active, sso_provider } = config;

      if (sso_active) {
        reply.send({
          success: true,
          sso: sso_active,
          provider: sso_provider,
        });
      }

      reply.send({
        success: true,
        sso: sso_active,
      });
    }
  );

  // Update OIDC Provider
  fastify.post(
    "/api/v1/config/authentication/oidc/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { clientId, clientSecret, redirectUri, issuer, jwtSecret }: any =
        request.body;

      const conf = await prisma.config.findFirst();

      await prisma.config.update({
        where: { id: conf!.id },
        data: {
          sso_active: true,
          sso_provider: "oidc",
        },
      });

      const existingProvider = await prisma.openIdConfig.findFirst();

      if (existingProvider === null) {
        await prisma.openIdConfig.create({
          data: {
            clientId: clientId,
            redirectUri: redirectUri,
            issuer: issuer,
          },
        });
      } else {
        await prisma.openIdConfig.update({
          where: { id: existingProvider.id },
          data: {
            clientId: clientId,
            redirectUri: redirectUri,
            issuer: issuer,
          },
        });
      }

      await tracking("oidc_provider_updated", {});

      reply.send({
        success: true,
        message: "OIDC config Provider updated!",
      });
    }
  );

  // Update Oauth Provider
  fastify.post(
    "/api/v1/config/authentication/oauth/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const {
        name,
        clientId,
        clientSecret,
        redirectUri,
        tenantId,
        issuer,
        jwtSecret,
      }: any = request.body;

      const conf = await prisma.config.findFirst();

      // Update config to true
      await prisma.config.update({
        where: { id: conf!.id },
        data: {
          sso_active: true,
          sso_provider: "oauth",
        },
      });

      // Check if the provider exists
      const existingProvider = await prisma.oAuthProvider.findFirst();

      if (existingProvider === null) {
        await prisma.oAuthProvider.create({
          data: {
            name: name,
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
            scope: "", // Add appropriate scope if needed
            authorizationUrl: "", // Add appropriate URL if needed
            tokenUrl: "", // Add appropriate URL if needed
            userInfoUrl: "", // Add appropriate URL if needed
          },
        });
      } else {
        await prisma.oAuthProvider.update({
          where: { id: existingProvider.id },
          data: {
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
          },
        });
      }

      await tracking("oauth_provider_updated", {});

      reply.send({
        success: true,
        message: "SSO Provider updated!",
      });
    }
  );

  // Delete auth config
  fastify.delete(
    "/api/v1/config/authentication",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const conf = await prisma.config.findFirst();

      // Update config to false
      await prisma.config.update({
        where: { id: conf!.id },
        data: {
          sso_active: false,
          sso_provider: "",
        },
      });

      // Delete the OAuth provider
      await prisma.oAuthProvider.deleteMany({});

      await tracking("sso_provider_deleted", {});

      reply.send({
        success: true,
        message: "SSO Provider deleted!",
      });
    }
  );

  // Check if Emails are enabled & GET email settings
  fastify.get(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      // GET EMAIL SETTINGS
      const config = await prisma.email.findFirst({
        select: {
          active: true,
          host: true,
          port: true,
          reply: true,
          user: true,
        },
      });

      if (config && config?.active) {
        const provider = await createTransportProvider();

        await new Promise((resolve, reject) => {
          provider.verify(function (error: any, success: any) {
            if (error) {
              console.log("ERROR", error);
              reply.send({
                success: true,
                active: true,
                email: config,
                verification: error,
              });
            } else {
              console.log("SUCCESS", success);
              console.log("Server is ready to take our messages");
              reply.send({
                success: true,
                active: true,
                email: config,
                verification: success,
              });
            }
          });
        });
      }

      reply.send({
        success: true,
        active: false,
      });
    }
  );

  // Update Email Provider Settings
  fastify.put(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const {
        host,
        active,
        port,
        reply: replyto,
        username,
        password,
        serviceType,
        clientId,
        clientSecret,
        redirectUri,
      }: any = request.body;

      const email = await prisma.email.findFirst();

      if (email === null) {
        await prisma.email.create({
          data: {
            host: host,
            port: port,
            reply: replyto,
            user: username,
            pass: password,
            active: true,
            clientId: clientId,
            clientSecret: clientSecret,
            serviceType: serviceType,
            redirectUri: redirectUri,
          },
        });
      } else {
        await prisma.email.update({
          where: { id: email.id },
          data: {
            host: host,
            port: port,
            reply: replyto,
            user: username,
            pass: password,
            active: active,
            clientId: clientId,
            clientSecret: clientSecret,
            serviceType: serviceType,
            redirectUri: redirectUri,
          },
        });
      }

      if (serviceType === "gmail") {
        const email = await prisma.email.findFirst();

        const google = new OAuth2Client(
          //@ts-expect-error
          email?.clientId,
          email?.clientSecret,
          email?.redirectUri
        );

        const authorizeUrl = google.generateAuthUrl({
          access_type: "offline",
          scope: "https://mail.google.com",
          prompt: "consent",
        });

        reply.send({
          success: true,
          message: "SSO Provider updated!",
          authorizeUrl: authorizeUrl,
        });
      }

      reply.send({
        success: true,
        message: "SSO Provider updated!",
      });
    }
  );

  // Google oauth callback
  fastify.get(
    "/api/v1/config/email/oauth/gmail",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code }: any = request.query;

      const email = await prisma.email.findFirst();

      const google = new OAuth2Client(
        //@ts-expect-error
        email?.clientId,
        email?.clientSecret,
        email?.redirectUri
      );

      const r = await google.getToken(code);

      await prisma.email.update({
        where: { id: email?.id },
        data: {
          refreshToken: r.tokens.refresh_token,
          accessToken: r.tokens.access_token,
          expiresIn: r.tokens.expiry_date,
          serviceType: "gmail",
        },
      });

      const provider = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: email?.user,
          clientId: email?.clientId,
          clientSecret: email?.clientSecret,
          refreshToken: r.tokens.refresh_token,
          accessToken: r.tokens.access_token,
          expiresIn: r.tokens.expiry_date,
        },
      });

      reply.send({
        success: true,
        message: "SSO Provider updated!",
      });
    }
  );

  // Disable/Enable Email
  fastify.delete(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      await prisma.email.deleteMany({});

      reply.send({
        success: true,
        message: "Email settings deleted!",
      });
    }
  );

  // Toggle all roles
  fastify.patch(
    "/api/v1/config/toggle-roles",
    {
      preHandler: requirePermission(["settings::manage"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { isActive }: any = request.body;
      const session = await checkSession(request);

      // Double-check that user is admin
      if (!session?.isAdmin) {
        return reply.code(403).send({
          message: "Unauthorized. Admin access required.",
          success: false,
        });
      }

      const config = await prisma.config.findFirst();

      await prisma.config.update({
        where: { id: config!.id },
        data: {
          roles_active: isActive,
        },
      });

      reply.send({
        success: true,
        message: "Roles updated!",
      });
    }
  );
}
