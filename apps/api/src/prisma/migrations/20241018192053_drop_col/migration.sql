/*
  Warnings:

  - You are about to drop the column `clientSecret` on the `openIdConfig` table. All the data in the column will be lost.
  - You are about to drop the column `jwtSecret` on the `openIdConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "openIdConfig" DROP COLUMN "clientSecret",
DROP COLUMN "jwtSecret";
