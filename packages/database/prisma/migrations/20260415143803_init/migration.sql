-- CreateTable
CREATE TABLE "health_check_records" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_check_records_pkey" PRIMARY KEY ("id")
);
