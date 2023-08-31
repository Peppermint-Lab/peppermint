-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('needs_support', 'in_progress', 'in_review', 'done');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'needs_support';
