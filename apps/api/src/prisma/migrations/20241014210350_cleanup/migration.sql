/*
  Warnings:

  - You are about to drop the column `out_of_office` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `out_of_office_end` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `out_of_office_message` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `out_of_office_start` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `portal_locale` on the `Config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "out_of_office",
DROP COLUMN "out_of_office_end",
DROP COLUMN "out_of_office_message",
DROP COLUMN "out_of_office_start",
DROP COLUMN "portal_locale";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "out_of_office" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "out_of_office_end" TIMESTAMP(3),
ADD COLUMN     "out_of_office_message" TEXT,
ADD COLUMN     "out_of_office_start" TIMESTAMP(3);
