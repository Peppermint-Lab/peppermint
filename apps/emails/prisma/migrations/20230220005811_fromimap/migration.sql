/*
  Warnings:

  - You are about to drop the column `levels` on the `Team` table. All the data in the column will be lost.
  - Added the required column `fromImap` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "levels";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "fromImap" BOOLEAN NOT NULL;
