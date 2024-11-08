-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "replyEmail" TEXT;
