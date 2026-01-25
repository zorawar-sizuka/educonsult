-- CreateEnum
CREATE TYPE "ContactService" AS ENUM ('CAREER_COUNSELING', 'UNIVERSITY_SHORTLISTING', 'SOP_LOR_SUPPORT', 'SCHOLARSHIP_GUIDANCE', 'VISA_COUNSELING', 'PRE_DEPARTURE_BRIEFING', 'LANGUAGE_PREPARATION', 'OTHER');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "gpa" TEXT,
    "englishScore" TEXT,
    "course" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "service" "ContactService" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "visitors" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "livingCostMonthlyUsd" INTEGER NOT NULL DEFAULT 1200,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" SERIAL NOT NULL,
    "base" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT NOT NULL DEFAULT 'unknown',

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT,
    "ranking" INTEGER,
    "tuitionYearUsd" INTEGER,
    "intake" TEXT,
    "applicationFeeUsd" INTEGER,
    "website" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedUniversity" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT,
    "userId" TEXT,
    "universityId" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedUniversity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolRun" (
    "id" SERIAL NOT NULL,
    "toolType" TEXT NOT NULL,
    "sessionId" TEXT,
    "userId" TEXT,
    "payload" JSONB NOT NULL,
    "result" JSONB,
    "saved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SOPTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SOPTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SOPDraft" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT,
    "userId" TEXT,
    "templateId" INTEGER NOT NULL,
    "inputs" JSONB NOT NULL,
    "generated" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SOPDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_service_idx" ON "Contact"("service");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRate_base_quote_key" ON "ExchangeRate"("base", "quote");

-- CreateIndex
CREATE INDEX "University_countryCode_idx" ON "University"("countryCode");

-- CreateIndex
CREATE INDEX "University_tuitionYearUsd_idx" ON "University"("tuitionYearUsd");

-- CreateIndex
CREATE UNIQUE INDEX "University_name_countryCode_key" ON "University"("name", "countryCode");

-- CreateIndex
CREATE INDEX "SavedUniversity_sessionId_createdAt_idx" ON "SavedUniversity"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "SavedUniversity_universityId_idx" ON "SavedUniversity"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedUniversity_sessionId_universityId_key" ON "SavedUniversity"("sessionId", "universityId");

-- CreateIndex
CREATE INDEX "ToolRun_toolType_createdAt_idx" ON "ToolRun"("toolType", "createdAt");

-- CreateIndex
CREATE INDEX "ToolRun_sessionId_idx" ON "ToolRun"("sessionId");

-- CreateIndex
CREATE INDEX "SOPDraft_sessionId_createdAt_idx" ON "SOPDraft"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "SOPDraft_templateId_idx" ON "SOPDraft"("templateId");

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedUniversity" ADD CONSTRAINT "SavedUniversity_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SOPDraft" ADD CONSTRAINT "SOPDraft_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SOPTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
