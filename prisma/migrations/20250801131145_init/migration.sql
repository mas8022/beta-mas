/*
  Warnings:

  - You are about to drop the column `create_at` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Otp" DROP COLUMN "create_at",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
