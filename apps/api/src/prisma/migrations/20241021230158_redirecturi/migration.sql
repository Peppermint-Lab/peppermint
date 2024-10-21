/*
  Warnings:

  - Made the column `expiresIn` on table `Email` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "redirectUri" TEXT,
ALTER COLUMN "expiresIn" SET NOT NULL;
