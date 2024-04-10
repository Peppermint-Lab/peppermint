/*
  Warnings:

  - Added the required column `encoding` to the `TicketFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime` to the `TicketFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `TicketFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TicketFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketFile" ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "mime" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TicketFile" ADD CONSTRAINT "TicketFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
