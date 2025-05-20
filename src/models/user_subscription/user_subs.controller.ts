import { Body, Controller, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UserSubscriptionDto } from './dto/payment.dto';
import { UserSubscriptionsService } from './user_subs.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@UseGuards(AuthGuard)
@Controller('subscription')
export class UserSubscriptionsController {
  constructor(private readonly userSubscriptionService: UserSubscriptionsService) { }
  @Post()
  async purchase(@Body() data: UserSubscriptionDto, @Req() req: Request) {
    const { id } = req['user']

    return await this.userSubscriptionService.purchase(data,id)
  }
}
