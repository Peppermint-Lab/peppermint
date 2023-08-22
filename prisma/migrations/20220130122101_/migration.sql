/*
  Warnings:

  - Added the required column `active` to the `Webhooks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `Webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhooks" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "secret" TEXT NOT NULL;
