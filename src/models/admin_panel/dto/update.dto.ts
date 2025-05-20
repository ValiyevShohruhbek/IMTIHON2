import { SubsMovie } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(SubsMovie)
  subscription_type: SubsMovie;

  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  category_ids: string[];
}
