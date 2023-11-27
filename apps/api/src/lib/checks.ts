import { FastifyReply, FastifyRequest } from "fastify";
import { checkToken } from "./jwt";

// Check valid token
export const authenticateUser = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: any
) => {
  const bearer = request.headers.authorization!.split(" ")[1];
  const token = checkToken(bearer);

  if (!token) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  // User is authenticated, continue to the route handler
  done();
};
