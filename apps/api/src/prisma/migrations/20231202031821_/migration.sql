/*
  Warnings:

  - The `encryption_key` column on the `Config` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "encryption_key",
ADD COLUMN     "encryption_key" BYTEA;
