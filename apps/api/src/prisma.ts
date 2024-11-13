import { Hook, Permission, PrismaClient, Role, User } from "@prisma/client";
export const prisma: PrismaClient = new PrismaClient();
export { Hook, Permission, Role, User };
