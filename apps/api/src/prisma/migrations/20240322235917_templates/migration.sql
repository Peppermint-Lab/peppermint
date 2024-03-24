-- CreateEnum
CREATE TYPE "Template" AS ENUM ('ticket_created', 'ticket_status_changed', 'ticket_assigned', 'ticket_comment');

-- CreateTable
CREATE TABLE "emailTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" "Template" NOT NULL,

    CONSTRAINT "emailTemplate_pkey" PRIMARY KEY ("id")
);
