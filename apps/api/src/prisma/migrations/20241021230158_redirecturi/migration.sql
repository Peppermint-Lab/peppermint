-- AlterTable
ALTER TABLE "Email" ADD COLUMN "redirectUri" TEXT,
ALTER COLUMN "expiresIn" DROP NOT NULL;
