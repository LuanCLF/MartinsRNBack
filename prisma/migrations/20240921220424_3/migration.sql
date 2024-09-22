/*
  Warnings:

  - You are about to drop the column `postId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Hosp` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instagram` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsApp` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsApp` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Hosp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Hosp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Hosp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsApp` to the `Hosp` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_postId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_postId_fkey";

-- DropForeignKey
ALTER TABLE "Hosp" DROP CONSTRAINT "Hosp_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropIndex
DROP INDEX "Event_postId_key";

-- DropIndex
DROP INDEX "Food_postId_key";

-- DropIndex
DROP INDEX "Hosp_postId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "postId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "postId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hosp" DROP COLUMN "postId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- AddForeignKey
ALTER TABLE "Hosp" ADD CONSTRAINT "Hosp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
