-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('bug', 'feature', 'support', 'incident', 'service', 'maintenance', 'access', 'feedback');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "type" "TicketType" NOT NULL DEFAULT 'support';
