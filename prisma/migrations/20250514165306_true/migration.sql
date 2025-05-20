/*
  Warnings:

  - You are about to alter the column `rating` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `subscription_plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to drop the column `planId` on the `user_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_subscriptions` table. All the data in the column will be lost.
  - You are about to alter the column `watched_percentage` on the `watch_history` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - Added the required column `plan_id` to the `user_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_planId_fkey";

-- DropForeignKey
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subscription_plans" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user_subscriptions" DROP COLUMN "planId",
DROP COLUMN "userId",
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "watch_history" ALTER COLUMN "watched_percentage" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
