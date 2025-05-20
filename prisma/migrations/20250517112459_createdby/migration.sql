/*
  Warnings:

  - You are about to drop the column `user_id` on the `movies` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_user_id_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "user_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
