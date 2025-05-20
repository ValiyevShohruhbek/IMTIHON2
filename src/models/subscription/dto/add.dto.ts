import {  IsArray, IsBoolean,  IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration_days: number;

  @IsArray()
  @IsOptional()  
  features: any[]; ;

  @IsBoolean()
  is_active: boolean 
}
