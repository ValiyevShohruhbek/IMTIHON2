import { Module } from '@nestjs/common';
import { FavoritesController } from './favorite.controller';
import { FavouritesService } from './favorite.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavouritesService],
})
export class FavoriteModule {}
