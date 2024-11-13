import { Hook, PrismaClient, Role, User } from "@prisma/client";
export const prisma: PrismaClient = new PrismaClient();
export { Hook, Role, User };
