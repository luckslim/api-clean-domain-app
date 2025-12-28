/*
  Warnings:

  - The values [employStore,User] on the enum `TypeUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeUser_new" AS ENUM ('creatorStore', 'employeeStore', 'user');
ALTER TABLE "user" ALTER COLUMN "typeUser" TYPE "TypeUser_new" USING ("typeUser"::text::"TypeUser_new");
ALTER TABLE "employee" ALTER COLUMN "typeUser" TYPE "TypeUser_new" USING ("typeUser"::text::"TypeUser_new");
ALTER TYPE "TypeUser" RENAME TO "TypeUser_old";
ALTER TYPE "TypeUser_new" RENAME TO "TypeUser";
DROP TYPE "public"."TypeUser_old";
COMMIT;

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "modifiedAt" SET DEFAULT null;
