/*
  Warnings:

  - You are about to drop the column `ticket_assigned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_comments` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_created` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_status_changed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ticket_assigned",
DROP COLUMN "ticket_comments",
DROP COLUMN "ticket_created",
DROP COLUMN "ticket_status_changed",
ADD COLUMN     "notify_ticket_assigned" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_ticket_comments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_ticket_created" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_ticket_status_changed" BOOLEAN NOT NULL DEFAULT true;
