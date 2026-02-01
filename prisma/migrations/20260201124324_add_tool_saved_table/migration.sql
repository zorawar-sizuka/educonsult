-- CreateTable
CREATE TABLE "ToolSaved" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "toolType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "result" JSONB,
    "originalRunId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolSaved_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToolSaved_sessionId_idx" ON "ToolSaved"("sessionId");

-- CreateIndex
CREATE INDEX "ToolSaved_sessionId_toolType_idx" ON "ToolSaved"("sessionId", "toolType");

-- CreateIndex
CREATE INDEX "ToolSaved_sessionId_createdAt_idx" ON "ToolSaved"("sessionId", "createdAt");
