-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecre" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "issuer" TEXT,
    "tenantId" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);
