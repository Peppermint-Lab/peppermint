-- CreateTable
CREATE TABLE "StorageConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "bucket" TEXT,
    "endpoint" TEXT,
    "region" TEXT,
    "accessKey" TEXT,
    "secretKey" TEXT,
    "basePath" TEXT NOT NULL DEFAULT 'uploads',
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StorageConfig_pkey" PRIMARY KEY ("id")
);
