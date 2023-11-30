-- AlterTable
ALTER TABLE "Config" ADD COLUMN     "client_version" TEXT,
ADD COLUMN     "feature_previews" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "gh_version" TEXT,
ADD COLUMN     "out_of_office" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "out_of_office_end" TIMESTAMP(3),
ADD COLUMN     "out_of_office_message" TEXT,
ADD COLUMN     "out_of_office_start" TIMESTAMP(3),
ADD COLUMN     "portal_locale" TEXT,
ADD COLUMN     "sso_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sso_provider" TEXT;

-- CreateTable
CREATE TABLE "SSO" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "issuer" TEXT,
    "tenantId" TEXT,

    CONSTRAINT "SSO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uptime" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "webhook" TEXT,
    "latency" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "Uptime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledgeBase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "author" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "ticketId" TEXT,

    CONSTRAINT "knowledgeBase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "knowledgeBase" ADD CONSTRAINT "knowledgeBase_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
