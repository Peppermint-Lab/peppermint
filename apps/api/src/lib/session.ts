import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

// Checks session token and returns user object
export async function checkSession(request: FastifyRequest) {
  try {
    const bearer = request.headers.authorization?.split(" ")[1];
    if (!bearer) {
      return null;
    }

    // Verify JWT token is valid
    var b64string = process.env.SECRET;
    var secret = Buffer.from(b64string!, "base64");

    try {
      jwt.verify(bearer, secret);
    } catch (e) {
      // Token is invalid or expired
      await prisma.session.delete({
        where: { sessionToken: bearer },
      });
      return null;
    }

    // Check if session exists and is not expired
    const session = await prisma.session.findUnique({
      where: { sessionToken: bearer },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      // Session expired or doesn't exist
      if (session) {
        await prisma.session.delete({
          where: { id: session.id },
        });
      }
      return null;
    }

    // Verify the request is coming from the same client
    const currentUserAgent = request.headers["user-agent"];
    const currentIp = request.ip;

    if (
      session.userAgent !== currentUserAgent &&
      session.ipAddress !== currentIp
    ) {
      // Potential session hijacking attempt - invalidate the session
      await prisma.session.delete({
        where: { id: session.id },
      });

      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}
