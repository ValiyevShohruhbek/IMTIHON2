-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "external_transaction_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subscription_plans" ALTER COLUMN "duration_days" DROP NOT NULL;
