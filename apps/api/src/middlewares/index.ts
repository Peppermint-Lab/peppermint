import { Role, User } from "@prisma/client";
import { FastifyRequest, FastifyReply, FastifyContext } from "fastify";
import jwt from "jsonwebtoken";

// middleware to check if user is authenticated
export function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: any) => void
) {
  try {
    if (!request.headers.authorization) {
      throw new Error("Authorization header is required");
    }

    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token is required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    // @ts-ignore
    request.context.user = decoded;
    return done();
  } catch (error: any) {
    reply.code(401).send({
      message: error.message,
    });
  }
}

// middleware to check if user is admin
export function isAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: any) => void
) {
  // @ts-ignore
  let user: User | null = request.context.user;

  if (!user) {
    reply.code(401).send({
      message: "Unauthorized",
    });
  }

  if (user!.role !== Role.ADMIN) {
    reply.code(403).send({
      message: "Forbidden",
    });
  }

  return done();
}
