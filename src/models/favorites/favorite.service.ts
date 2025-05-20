import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorites(movie_id: string, userId: string) {
    const res = await this.prisma.favorites.create({
      data: {
        movie_id,
        user_id: userId,
      },
    });
    return { data: res };
  }

  async getFavorites() {
    const res = await this.prisma.favorites.findMany({
      include: { movie: true },
    });
    const total = await this.prisma.favorites.count();
    return { data: res, total };
  }

  async deleteFavorites(movie_id: string, userId: string) {
    return await this.prisma.favorites.deleteMany({
      where: { movie_id, user_id: userId },
    });
  }
}
