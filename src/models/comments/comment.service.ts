import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ReviewDto } from './dto/create.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: string, movieId: string, dto: ReviewDto) {
    const review = await this.prisma.reviews.create({
      data: {
        user_id: userId,
        movie_id: movieId,
        rating: dto.rating,
        comment: dto.comment,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return {
      message: "Sharh muvaffaqiyatli qo'shildi",
      data: review,
    };
  }

  async deleteReview(movieId: string, reviewId: string) {
    const review = await this.prisma.reviews.findUnique({
      where: { id: reviewId },
    });

    if (!review || review.movie_id !== movieId) {
      throw new NotFoundException('Sharh topilmadi');
    }

    await this.prisma.reviews.delete({
      where: { id: reviewId },
    });

    return {
      message: "Sharh muvaffaqiyatli o'chirildi",
    };
  }
}
