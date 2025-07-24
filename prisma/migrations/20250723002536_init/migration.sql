-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "presentationName" TEXT,
    "CPNJ" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "conectaPlus" BOOLEAN DEFAULT false,
    "clienStatus" "ClientStatus" NOT NULL DEFAULT 'INACTIVE',
    "tags" TEXT [],
    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "UserClient" (
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3),
    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("userId", "clientId")
);
-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Brasil',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- AddForeignKey
ALTER TABLE "Client"
ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "UserClient"
ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "UserClient"
ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;