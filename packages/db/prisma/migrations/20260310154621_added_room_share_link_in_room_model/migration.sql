/*
  Warnings:

  - The required column `shareLink` was added to the `Room` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "shareLink" TEXT NOT NULL;
