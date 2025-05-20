import { IsInt, IsString, Min, Max } from 'class-validator';

export class ReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
