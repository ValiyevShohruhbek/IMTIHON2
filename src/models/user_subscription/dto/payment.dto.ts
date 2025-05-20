import { IsBoolean, IsString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentDetailsDto {
  @IsString()
  card_number: string;

  @IsString()
  expiry: string;

  @IsString()
  card_holder: string;
}

export class UserSubscriptionDto {
  @IsString()
  plan_id: string;

  @IsString()
  payment_method: string;

  @IsBoolean()
  auto_renew: boolean;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  @IsObject()
  payment_details: PaymentDetailsDto;
}
