// Check Github Version
// Add outbound email provider
// Email Verification
// SSO Provider
// Portal Locale
// Feature Flags

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import nodeMailer from "nodemailer";

import { checkToken } from "../lib/jwt";
import { prisma } from "../prisma";

export function configRoutes(fastify: FastifyInstance) {
  // Check if SSO is enabled
  fastify.get(
    "/api/v1/config/sso/enabled",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const config = await prisma.config.findFirst();

        //@ts-expect-error
        const { sso_active } = config;

        if (sso_active) {
          const provider = await prisma.provider.findFirst({});

          reply.send({
            success: true,
            sso: sso_active,
            provider: provider,
          });
        }

        reply.send({
          success: true,
          sso: sso_active,
        });
      }
    }
  );

  // Update SSO Provider Settings
  fastify.post(
    "/api/v1/config/sso/provider",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const {
          name,
          client_id,
          client_secret,
          redirect_uri,
          tenantId,
          issuer,
        }: any = request.body;

        const conf = await prisma.config.findFirst();

        //update config to true
        await prisma.config.update({
          where: { id: conf!.id },
          data: {
            sso_active: true,
            sso_provider: name,
          },
        });

        const check_provider = await prisma.provider.findFirst({});

        if (check_provider === null) {
          await prisma.provider.create({
            data: {
              name: name,
              clientId: client_id,
              clientSecret: client_secret,
              active: true,
              redirectUri: redirect_uri,
              tenantId: tenantId,
              issuer: issuer,
            },
          });
        } else {
          await prisma.provider.update({
            where: { id: check_provider.id },
            data: {
              name: name,
              clientId: client_id,
              clientSecret: client_secret,
              active: true,
              redirectUri: redirect_uri,
              tenantId: tenantId,
              issuer: issuer,
            },
          });
        }

        reply.send({
          success: true,
          message: "SSO Provider updated!",
        });
      }
    }
  );

  // Delete SSO Provider
  fastify.delete(
    "/api/v1/config/sso/provider",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const conf = await prisma.config.findFirst();

        //update config to true
        await prisma.config.update({
          where: { id: conf!.id },
          data: {
            sso_active: false,
            sso_provider: "",
          },
        });

        const provider = await prisma.provider.findFirst({});
        await prisma.provider.delete({
          where: { id: provider!.id },
        });

        reply.send({
          success: true,
          message: "SSO Provider deleted!",
        });
      }
    }
  );

  // Check if Emails are enabled & GET email settings
  fastify.get(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
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

        if (config === null) {
          reply.send({
            success: true,
            active: false,
          });
        }

        if (config?.active) {
          reply.send({
            success: true,
            active: true,
            email: config,
          });
        } else {
          reply.send({
            success: true,
            active: false,
            email: config,
          });
        }
      }
    }
  );

  // Update Email Provider Settings
  fastify.put(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const {
          host,
          active,
          port,
          reply: replyto,
          username,
          password,
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
            },
          });
        }

        reply.send({
          success: true,
          message: "SSO Provider updated!",
        });
      }
    }
  );

  // Test email is working
  fastify.get(
    "/api/v1/config/email/verify",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        // GET EMAIL SETTINGS
        const config = await prisma.email.findFirst({});

        if (config === null) {
          return reply.send({
            success: true,
            active: false,
          });
        }

        const emails = await prisma.email.findMany();
        const email = emails[0];

        const mail = nodeMailer.createTransport({
          // @ts-ignore
          host: email.host,
          port: email.port,
          secure: email.port === "465" ? true : false,
          auth: {
            user: email.user,
            pass: email.pass,
          },
        });

        const ver = await mail.verify();

        if (ver) {
          reply.send({
            success: true,
            message: "Email is working!",
          });
        } else {
          reply.send({
            success: false,
            message:
              "Incorrect settings or credentials provided. Please check and try again.",
          });
        }
      }
    }
  );

  // Disable/Enable Email
  fastify.delete(
    "/api/v1/config/email",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        await prisma.email.deleteMany({});

        reply.send({
          success: true,
          message: "Email settings deleted!",
        });
      }
    }
  );
}
