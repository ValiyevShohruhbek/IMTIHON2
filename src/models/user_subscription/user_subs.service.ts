import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaymentDetailsDto, UserSubscriptionDto } from './dto/payment.dto';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class UserSubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}
  async purchase(data: UserSubscriptionDto, id: string) {
    const checkPlan = await this.prisma.subscription_plans.findFirst({
      where: { id: data.plan_id },
    });
    if (!checkPlan) throw new ConflictException('Bunday plan_id mavjud emas');

    const endDate = new Date();
    const addedDays = checkPlan.duration_days ?? 0;
    const resultDate = new Date(
      endDate.getTime() + addedDays * 24 * 60 * 60 * 1000,
    );

    const userSubs = await this.prisma.user_subscriptions.create({
      data: {
        user_id: id,
        plan_id: checkPlan.id,
        end_date: resultDate,
        auto_renew: data.auto_renew,
      },
    });

    const payment = await this.prisma.payments.create({
      data: {
        user_subscription_id: userSubs.id,
        amount: checkPlan.price,
        payment_method: data.payment_method as PaymentMethod,
        payment_details: JSON.stringify(data.payment_details),
        status: 'completed',
        external_transaction_id: 'lalalalalla',
      },
    });

    const update = await this.prisma.user_subscriptions.update({
      where: { id: userSubs.id },
      data: { status: payment ? 'active' : 'canceled' },
    });
    let subscription = await this.prisma.user_subscriptions.findFirst({
      where: { id: userSubs.id },
      select: {
        id: true,
        plan: { select: { id: true, name: true } },
        start_date: true,
        end_date: true,
        status: true,
        auto_renew: true,
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            external_transaction_id: true,
            payment_method: true,
          },
        },
      },
    });

    return {
      message: "Siz muvaffaqiyatli obuna bo'ldingiz !",
      data: { subscription },
    };
  }
}
