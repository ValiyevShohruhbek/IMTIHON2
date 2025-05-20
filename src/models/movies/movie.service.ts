import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = query.search?.toLowerCase() || '';
    const category = query.category?.toLowerCase();
    const subscription_type = query.subscription_type;

    const whereCondition: any = {
      title: {
        contains: search,
        mode: 'insensitive',
      },
      ...(subscription_type && { subscription_type }),
      ...(category && {
        movie_categories: {
          some: {
            category: {
              name: {
                equals: category,
                mode: 'insensitive',
              },
            },
          },
        },
      }),
    };

    const [movies, total] = await Promise.all([
      this.prisma.movies.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
          movie_categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.movies.count({
        where: whereCondition,
      }),
    ]);

    const mappedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      poster_url: movie.poster_url,
      release_year: movie.release_year,
      rating: movie.rating,
      subscription_type: movie.subscription_type,
      categories: movie.movie_categories.map((mc) => mc.category.name),
    }));

    return {
      success: true,
      data: {
        movies: mappedMovies,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getOne(slug: string) {
    const res = await this.prisma.movies.findMany({
      where: { slug },
      include: {
        movie_files: true,
        movie_categories: { include: { category: true } },
      },
    });

    const {
      _sum: { rating },
    } = await this.prisma.movies.aggregate({
      where: { slug },
      _sum: { rating: true },
    });

    const updateViewCount = await this.prisma.movies.update({
      where: { slug },
      data: { view_count: { increment: 1 } },
    });

    const viewCount = res[0]?.view_count ?? 0;

    const avarage_rating = viewCount > 0 ? rating! / viewCount : 0;

    const newData = { ...res, reviews: { avarage_rating, count: viewCount } };

    return { data: newData };
  }
}
