import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { track } from "../lib/hog";
import { requirePermission } from "../lib/roles";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function roleRoutes(fastify: FastifyInstance) {
  // Create a new role
  fastify.post(
    "/api/v1/role/create",
    {
      preHandler: requirePermission(["role::create"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await checkSession(request);
      const { name, description, permissions, isDefault }: any = request.body;

      const existingRole = await prisma.role.findUnique({
        where: { name },
      });

      if (existingRole) {
        return reply.status(400).send({
          message: "Role already exists",
          success: false,
        });
      }

      await prisma.role.create({
        data: {
          name,
          description,
          permissions,
          isDefault: isDefault || false,
        },
      });

      const client = track();
      client.capture({
        event: "role_created",
        distinctId: "uuid",
      });
      client.shutdownAsync();

      reply.status(200).send({ message: "Role created!", success: true });
    }
  );

  // Get all roles
  fastify.get(
    "/api/v1/roles/all",
    {
      preHandler: requirePermission(["role::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const roles = await prisma.role.findMany({
        include: {
          users: false,
        },
      });

      const active = await prisma.config.findFirst({
        select: {
          roles_active: true,
        },
      });

      reply.status(200).send({ roles, success: true, roles_active: active });
    }
  );

  // Get role by ID
  fastify.get(
    "/api/v1/role/:id",
    {
      preHandler: requirePermission(["role::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;

      const role = await prisma.role.findUnique({
        where: { id },
        include: {
          users: true,
        },
      });

      if (!role) {
        return reply.status(404).send({
          message: "Role not found",
          success: false,
        });
      }

      reply.status(200).send({ role, success: true });
    }
  );

  // Update role
  fastify.put(
    "/api/v1/role/:id/update",
    {
      preHandler: requirePermission(["role::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;
      const { name, description, permissions, isDefault, users }: any =
        request.body;

      try {
        const updatedRole = await prisma.role.update({
          where: { id },
          data: {
            name,
            description,
            permissions,
            isDefault,
            updatedAt: new Date(),
            users: {
              set: Array.isArray(users)
                ? users.map((userId) => ({ id: userId }))
                : [{ id: users }], // Ensure users is an array of objects with unique IDs when updating
            },
          },
        });

        reply.status(200).send({ role: updatedRole, success: true });
      } catch (error: any) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "Role not found",
            success: false,
          });
        }
        throw error;
      }
    }
  );

  // Delete role
  fastify.delete(
    "/api/v1/role/:id/delete",
    {
      preHandler: requirePermission(["role::delete"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;

      try {
        await prisma.role.delete({
          where: { id },
        });

        reply.status(200).send({ success: true });
      } catch (error: any) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "Role not found",
            success: false,
          });
        }
        throw error;
      }
    }
  );

  // Assign role to user
  fastify.post(
    "/api/v1/role/assign",
    {
      preHandler: requirePermission(["role::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, roleId }: any = request.body;

      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            roles: {
              connect: { id: roleId },
            },
          },
          include: {
            roles: true,
          },
        });

        reply.status(200).send({ user: updatedUser, success: true });
      } catch (error: any) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "User or Role not found",
            success: false,
          });
        }
        throw error;
      }
    }
  );

  // Remove role from user
  fastify.post(
    "/api/v1/role/remove",
    {
      //   preHandler: requirePermission(['role::remove']),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, roleId }: any = request.body;

      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            roles: {
              disconnect: { id: roleId },
            },
          },
          include: {
            roles: true,
          },
        });

        reply.status(200).send({ user: updatedUser, success: true });
      } catch (error: any) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "User or Role not found",
            success: false,
          });
        }
        throw error;
      }
    }
  );
}
