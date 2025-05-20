import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import slugify from 'slugify';
import ShortUniqueId from 'short-unique-id';
import {
  CreateDtoCategories,
  CreateDtoMovies,
  MovieVideoDto,
} from './dto/create.dto';
import { SubsMovie } from '@prisma/client';
import { UpdateMovieDto } from './dto/update.dto';

@Injectable()
export class AdminPanelService {
  private uid = new ShortUniqueId({ length: 8 });

  constructor(private readonly prisma: PrismaService) {}

  async addMovies(data: CreateDtoMovies, file: string, id: string) {
    const slug =
      slugify(data.title, { strict: true, lower: true }) +
      '-' +
      this.uid.randomUUID();

    const { category_ids, ...movieInfo } = data;

    const movie = await this.prisma.movies.create({
      data: {
        ...movieInfo,
        slug,
        poster_url: file,
        createdBy: id,
        rating: Math.floor(Math.random() * 10),

        movie_categories: {
          create: category_ids.map((id) => ({
            category: {
              connect: { id },
            },
          })),
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        created_at: true,
      },
    });

    return { message: "Kinolar qo'shildi", data: movie };
  }

  async addCategory(data: CreateDtoCategories) {
    const slug =
      slugify(data.name, { strict: true, lower: true }) +
      '-' +
      this.uid.randomUUID();
    const res = await this.prisma.categories.create({
      data: {
        name: data.name,
        description: data.description,
        slug: slug,
      },
    });

    return { message: 'Categoriya muvaffaqiyatli yaratlidi !', res };
  }

  async getAll() {
    const total = await this.prisma.movies.count();

    const result = await this.prisma.movies.findMany();
    return { movies: result, total: Number(total) };
  }

  async deleteMovie(id: string) {
    await this.prisma.reviews.deleteMany({ where: { movie_id: id } });
    await this.prisma.movie_Files.deleteMany({ where: { movie_id: id } });
    await this.prisma.movie_Categories.deleteMany({ where: { movie_id: id } });
    await this.prisma.favorites.deleteMany({ where: { movie_id: id } });
    const result = await this.prisma.movies.delete({ where: { id } });
    return { message: "kino o'chirildi." };
  }

  async updateMovie(data: UpdateMovieDto, id: string) {
    await this.prisma.movie_Categories.deleteMany({
      where: { movie_id: id },
    });
    await this.prisma.movie_Categories.createMany({
      data: data.category_ids!.map((categoryId: string) => ({
        movie_id: id,
        category_id: categoryId,
      })),
    });
    const res = await this.prisma.movies.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        subscription_type: data.subscription_type as SubsMovie,
      },
    });
    return { message: 'Malumot yangilandi', res };
  }

  async addVideo(
    data: MovieVideoDto,
    id: string,
    filename: string,
    size_mb: number,
  ) {
    const res = await this.prisma.movie_Files.create({
      data: {
        file_url: filename,
        quality: data.quality,
        language: data.language,
        movie_id: id,
      },
    });

    const newData = { ...res, size_mb };

    return { message: "Video qo'shildi", data: newData };
  }
}
