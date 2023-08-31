/*
  Warnings:

  - You are about to drop the column `teamId` on the `EmailQueue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailQueue" DROP CONSTRAINT "EmailQueue_teamId_fkey";

-- AlterTable
ALTER TABLE "EmailQueue" DROP COLUMN "teamId";
