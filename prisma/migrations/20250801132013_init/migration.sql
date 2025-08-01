-- CreateTable
CREATE TABLE "public"."refreshToken" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);
