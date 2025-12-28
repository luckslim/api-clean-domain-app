/*
  Warnings:

  - Added the required column `storeId` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "modifiedAt" SET DEFAULT null;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
