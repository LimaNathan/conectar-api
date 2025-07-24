/*
  Warnings:

  - Made the column `joinedAt` on table `UserClient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserClient" ALTER COLUMN "joinedAt" SET NOT NULL,
ALTER COLUMN "joinedAt" SET DEFAULT CURRENT_TIMESTAMP;
