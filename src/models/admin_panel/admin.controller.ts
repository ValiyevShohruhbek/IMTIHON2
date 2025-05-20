import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminPanelService } from './admin.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import {
  CreateDtoCategories,
  CreateDtoMovies,
  MovieVideoDto,
} from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateMovieDto } from './dto/update.dto';

@UseGuards(AuthGuard, RoleGuard)
@SetMetadata('roles', ['admin', 'superadmin'])
@Controller('admin')
export class AdminPanelController {
  constructor(private readonly adminService: AdminPanelService) {}

  @Post('movies')
  @UseInterceptors(FileInterceptor('poster'))
  async addMovie(
    @Body() data: CreateDtoMovies,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const id = req['user']['id'];

    return await this.adminService.addMovies(data, file.filename, id);
  }

  @Post('category')
  async addCategory(@Body() data: CreateDtoCategories) {
    return await this.adminService.addCategory(data);
  }

  @Get('movies/get')
  async getAll() {
    return await this.adminService.getAll();
  }

  @Delete('movies/:id')
  async deleteMovies(@Param('id') movieId: string) {
    return await this.adminService.deleteMovie(movieId);
  }

  @Put('movies/put/:id')
  async updateMovies(
    @Body() data: UpdateMovieDto,
    @Param('id') movieId: string,
  ) {
    return await this.adminService.updateMovie(data, movieId);
  }

  @Post('movies/:id/files')
  @UseInterceptors(FileInterceptor('video'))
  async addFiles(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: MovieVideoDto,
    @Param('id') id: string,
  ) {
    const size_mb = Math.ceil(file.size / (1024 * 1024));

    return await this.adminService.addVideo(data, id, file.filename, size_mb);
  }
}
