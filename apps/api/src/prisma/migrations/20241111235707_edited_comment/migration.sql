-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "edited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "editedAt" TIMESTAMP(3),
ADD COLUMN     "previous" TEXT;
