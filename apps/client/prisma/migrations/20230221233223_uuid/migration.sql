/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Discord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Email` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EmailQueue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Imap_Email` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Slack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TicketFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Todos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Webhooks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Imap_Email" DROP CONSTRAINT "Imap_Email_emailQueueId_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- DropForeignKey
ALTER TABLE "TicketFile" DROP CONSTRAINT "TicketFile_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UserFile" DROP CONSTRAINT "UserFile_userId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Client_id_seq";

-- AlterTable
ALTER TABLE "Config" DROP CONSTRAINT "Config_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Config_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Config_id_seq";

-- AlterTable
ALTER TABLE "Discord" DROP CONSTRAINT "Discord_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Discord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Discord_id_seq";

-- AlterTable
ALTER TABLE "Email" DROP CONSTRAINT "Email_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Email_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Email_id_seq";

-- AlterTable
ALTER TABLE "EmailQueue" DROP CONSTRAINT "EmailQueue_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EmailQueue_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EmailQueue_id_seq";

-- AlterTable
ALTER TABLE "Imap_Email" DROP CONSTRAINT "Imap_Email_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "emailQueueId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Imap_Email_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Imap_Email_id_seq";

-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notes_id_seq";

-- AlterTable
ALTER TABLE "Slack" DROP CONSTRAINT "Slack_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slack_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slack_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clientId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ticket_id_seq";

-- AlterTable
ALTER TABLE "TicketFile" DROP CONSTRAINT "TicketFile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ticketId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TicketFile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TicketFile_id_seq";

-- AlterTable
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Todos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Todos_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserFile" DROP CONSTRAINT "UserFile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserFile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserFile_id_seq";

-- AlterTable
ALTER TABLE "Webhooks" DROP CONSTRAINT "Webhooks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Webhooks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Webhooks_id_seq";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketFile" ADD CONSTRAINT "TicketFile_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imap_Email" ADD CONSTRAINT "Imap_Email_emailQueueId_fkey" FOREIGN KEY ("emailQueueId") REFERENCES "EmailQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
