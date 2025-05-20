import { Module } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionController } from "./subscription.controller";

@Module({
  imports: [],
  controllers: [SubscriptionController],
  providers:[SubscriptionService]
})
export class SubscriptionModule{}