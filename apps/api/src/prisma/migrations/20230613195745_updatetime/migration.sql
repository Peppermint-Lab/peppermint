/*
  Warnings:

  - You are about to drop the column `endTime` on the `TimeTracking` table. All the data in the column will be lost.
  - You are about to drop the column `minutesDiff` on the `TimeTracking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `TimeTracking` table. All the data in the column will be lost.
  - Added the required column `time` to the `TimeTracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTracking" DROP COLUMN "endTime",
DROP COLUMN "minutesDiff",
DROP COLUMN "startTime",
ADD COLUMN     "time" INTEGER NOT NULL;
