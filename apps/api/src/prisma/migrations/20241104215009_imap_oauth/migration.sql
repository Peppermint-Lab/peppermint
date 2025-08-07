-- AlterTable
ALTER TABLE "EmailQueue" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "clientSecret" TEXT,
ADD COLUMN     "expiresIn" BIGINT,
ADD COLUMN     "redirectUri" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "serviceType" TEXT NOT NULL DEFAULT 'other',
ADD COLUMN     "tenantId" TEXT;
