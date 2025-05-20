import { SubsMovie, VideoQuality } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateDtoMovies {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  release_year: number;

  @Type(() => Number)
  @IsNumber()
  duration_minutes: number;

  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsEnum(SubsMovie)
  subscription_type: SubsMovie;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  category_ids: string[];
}

export class CreateDtoCategories {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class MovieVideoDto {
  @IsEnum(VideoQuality)
  quality: VideoQuality;

  @IsString()
  language: string;
}
