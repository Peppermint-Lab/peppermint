-- AlterTable
ALTER TABLE "Imap_Email" ADD COLUMN     "emailQueueId" INTEGER,
ALTER COLUMN "from" DROP NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "html" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EmailQueue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "tls" BOOLEAN NOT NULL DEFAULT true,
    "teams" JSONB,
    "teamId" INTEGER,

    CONSTRAINT "EmailQueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Imap_Email" ADD CONSTRAINT "Imap_Email_emailQueueId_fkey" FOREIGN KEY ("emailQueueId") REFERENCES "EmailQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailQueue" ADD CONSTRAINT "EmailQueue_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
