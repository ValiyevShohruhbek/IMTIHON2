import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ReviewDto } from './dto/create.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('movies')
@UseGuards(AuthGuard, RoleGuard)
@SetMetadata('roles', ['user', 'admin', 'superadmin'])
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('/:movieId')
  async addReview(
    @Param('movieId') movieId: string,
    @Body() dto: ReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;

    return this.commentService.createReview(userId, movieId, dto);
  }

  @Delete('/:movieId/:reviewId')
  async removeReview(
    @Param('movieId') movieId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.commentService.deleteReview(movieId, reviewId);
  }
}
