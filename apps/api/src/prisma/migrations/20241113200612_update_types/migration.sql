/*
  Warnings:

  - The `permissions` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "permissions" JSONB[];

-- DropEnum
DROP TYPE "Permission";
