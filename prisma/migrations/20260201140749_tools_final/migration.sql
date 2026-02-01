/*
  Warnings:

  - You are about to drop the `SOPDraft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SOPTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SOPDraft" DROP CONSTRAINT "SOPDraft_templateId_fkey";

-- DropTable
DROP TABLE "SOPDraft";

-- DropTable
DROP TABLE "SOPTemplate";
