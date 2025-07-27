/*
  Warnings:

  - You are about to drop the column `clienStatus` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "clienStatus",
ADD COLUMN     "clientStatus" "ClientStatus" NOT NULL DEFAULT 'ACTIVE';
