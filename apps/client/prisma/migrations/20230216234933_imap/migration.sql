-- CreateTable
CREATE TABLE "Imap_Email" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "html" TEXT NOT NULL,

    CONSTRAINT "Imap_Email_pkey" PRIMARY KEY ("id")
);
