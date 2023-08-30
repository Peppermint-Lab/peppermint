-- CreateTable
CREATE TABLE "TimeTracking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "comment" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "minutesDiff" INTEGER NOT NULL,
    "clientId" TEXT,
    "userId" TEXT,
    "ticketId" TEXT,

    CONSTRAINT "TimeTracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeTracking" ADD CONSTRAINT "TimeTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTracking" ADD CONSTRAINT "TimeTracking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTracking" ADD CONSTRAINT "TimeTracking_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
