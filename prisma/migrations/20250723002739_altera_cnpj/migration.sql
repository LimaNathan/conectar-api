/*
 Warnings:

 - You are about to drop the column `CPNJ` on the `Client` table. All the data in the column will be lost.
 - Added the required column `CNPJ` to the `Client` table without a default value. This is not possible if the table is not empty.

 */
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "CPNJ",
  ADD COLUMN "CNPJ" TEXT NOT NULL;