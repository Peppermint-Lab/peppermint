/*
  Warnings:

  - You are about to drop the column `isUnissued` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "isUnissued";

-- AlterTable
ALTER TABLE "Todos" ALTER COLUMN "done" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT NOT NULL;
