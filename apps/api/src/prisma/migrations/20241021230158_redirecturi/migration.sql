-- AlterTable
ALTER TABLE "Email" ADD COLUMN "redirectUri" TEXT;
ALTER TABLE "Email" ALTER COLUMN "expiresIn" DROP NOT NULL;
