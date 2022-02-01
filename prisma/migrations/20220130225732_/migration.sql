/*
  Warnings:

  - Added the required column `createdBy` to the `Webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhooks" ADD COLUMN     "createdBy" TEXT NOT NULL,
ALTER COLUMN "secret" DROP NOT NULL;
