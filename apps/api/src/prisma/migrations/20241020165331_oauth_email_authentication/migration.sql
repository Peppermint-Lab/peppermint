-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "clientSecret" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "serviceType" TEXT NOT NULL DEFAULT 'other',
ADD COLUMN     "tenantId" TEXT,
ALTER COLUMN "pass" DROP NOT NULL;
