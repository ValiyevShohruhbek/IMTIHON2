import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subs.service';
import { UserSubscriptionsController } from './user_subs.controller';

@Module({
  imports: [],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
})
export class UserSubscriptionsModule {}
