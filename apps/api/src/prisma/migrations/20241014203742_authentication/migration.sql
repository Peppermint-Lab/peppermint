/*
  Warnings:

  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Provider";

-- CreateTable
CREATE TABLE "OAuthProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "authorizationUrl" TEXT NOT NULL,
    "tokenUrl" TEXT NOT NULL,
    "userInfoUrl" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,
    "scope" TEXT NOT NULL,

    CONSTRAINT "OAuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SAMLProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "entryPoint" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "cert" TEXT NOT NULL,
    "ssoLoginUrl" TEXT NOT NULL,
    "ssoLogoutUrl" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "acsUrl" TEXT NOT NULL,

    CONSTRAINT "SAMLProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthProvider_name_key" ON "OAuthProvider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SAMLProvider_name_key" ON "SAMLProvider"("name");
