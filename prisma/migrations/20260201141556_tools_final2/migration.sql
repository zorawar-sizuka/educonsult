/*
  Warnings:

  - A unique constraint covering the columns `[originalRunId]` on the table `ToolSaved` will be added. If there are existing duplicate values, this will fail.
  - Made the column `originalRunId` on table `ToolSaved` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ToolSaved" ALTER COLUMN "originalRunId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ToolSaved_originalRunId_key" ON "ToolSaved"("originalRunId");
