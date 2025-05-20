import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CreateDto } from './dto/add.dto';

@Controller('subscription')
@UseGuards(AuthGuard, RoleGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }
  
  @Post('add')
  @SetMetadata('roles', ['admin', 'superadmin'])
  async addSubscription(@Body() data : CreateDto) {
    return await this.subscriptionService.add(data)
  }

  @Get('all')
  @SetMetadata('roles', ['admin', 'superadmin'])
  async getAll() {
    return await this.subscriptionService.getAll()
  }
}
