/*
  Warnings:

  - You are about to drop the column `body` on the `emailTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `emailTemplate` table. All the data in the column will be lost.
  - Added the required column `html` to the `emailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emailTemplate" DROP COLUMN "body",
DROP COLUMN "name",
ADD COLUMN     "html" TEXT NOT NULL;
