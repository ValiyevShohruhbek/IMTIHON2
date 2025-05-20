import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('movies')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(@Query() query: any) {
    return await this.movieService.getAll(query);
  }

  @Get('/:slug')
  async getOneMovies(@Param('slug') slug: string) {
    return await this.movieService.getOne(slug);
  }
}
