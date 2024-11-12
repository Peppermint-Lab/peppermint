import { PrismaClient } from "@prisma/client";
export const prisma: PrismaClient = new PrismaClient();
export type Hook = "ticket_created" | "ticket_status_changed";
