import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/add.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}
  async add(data: CreateDto) {
    return await this.prisma.subscription_plans.create({ data });
  }

  async getAll() {
    return await this.prisma.subscription_plans.findMany()
  }
}
