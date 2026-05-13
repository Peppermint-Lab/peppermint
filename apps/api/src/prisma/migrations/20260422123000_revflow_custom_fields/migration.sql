ALTER TYPE "TicketType" ADD VALUE 'revflow';

ALTER TABLE "Ticket"
ADD COLUMN "custom_field_1" TEXT,
ADD COLUMN "custom_field_2" TEXT,
ADD COLUMN "custom_field_3" TEXT,
ADD COLUMN "outcome" TEXT,
ADD COLUMN "customer_field" TEXT;
