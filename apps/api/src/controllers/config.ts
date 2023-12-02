// Check Github Version
// Add outbound email provider
// Email Verification
// SSO Provider
// Portal Locale
// Feature Flags

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
}
