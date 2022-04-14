-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ticket_assigned" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ticket_comments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ticket_created" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ticket_status_changed" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "language" SET DEFAULT E'en';

-- CreateTable
CREATE TABLE "Discord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "secret" TEXT,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Discord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slack" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "secret" TEXT,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Slack_pkey" PRIMARY KEY ("id")
);
