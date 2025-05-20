/*
  Warnings:

  - Added the required column `user_id` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_created_by_fkey";

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_subscriptions" ALTER COLUMN "end_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
