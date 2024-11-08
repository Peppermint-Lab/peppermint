-- CreateTable
CREATE TABLE "openIdConfig" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,
    "jwtSecret" TEXT NOT NULL,

    CONSTRAINT "openIdConfig_pkey" PRIMARY KEY ("id")
);
