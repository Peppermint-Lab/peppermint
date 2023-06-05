import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

export const client = new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";