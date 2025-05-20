import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from './favorite.service';

import { Role } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('favorites')
@UseGuards(AuthGuard, RoleGuard)
@SetMetadata('roles', ['admin', 'user', 'superadmin'])
export class FavoritesController {
  constructor(private readonly favoriteService: FavouritesService) {}
  @Post()
  async addFavorites(@Body() movie, @Req() req: Request) {
    const userId = req['user']['id'];
    const { movie_id } = movie;

    return await this.favoriteService.addFavorites(movie_id, userId);
  }

  @Get()
  async getFavorites() {
    return await this.favoriteService.getFavorites();
  }

  @Delete('/:id')
  async deleteFavorites(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user']['id'];
    return await this.favoriteService.deleteFavorites(id, userId);
  }
}
