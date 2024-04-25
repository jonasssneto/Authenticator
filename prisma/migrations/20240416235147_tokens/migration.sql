-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('Access', 'ResetPassword');

-- CreateTable
CREATE TABLE "User_token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenType" "TokenType" NOT NULL,
    "token" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_token_pkey" PRIMARY KEY ("id")
);
