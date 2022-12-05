/*
  Warnings:

  - Added the required column `host` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reply` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "host" TEXT NOT NULL,
ADD COLUMN     "reply" TEXT NOT NULL;
