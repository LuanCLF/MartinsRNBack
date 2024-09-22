/*
  Warnings:

  - Made the column `instagram` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsApp` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsApp` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram` on table `Hosp` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsApp` on table `Hosp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "whatsApp" SET NOT NULL;

-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "whatsApp" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hosp" ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "whatsApp" SET NOT NULL;
