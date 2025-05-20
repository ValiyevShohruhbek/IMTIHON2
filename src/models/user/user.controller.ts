import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCreate } from '../auth/dto/create.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @SetMetadata('roles', ['admin', 'superadmin'])
  findAll() {
    return this.userService.findAll();
  }

  @Patch('update')
  @SetMetadata('roles', ['admin', 'superadmin', 'user'])
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Body() data: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { id } = req['user'];
    const avatar = req['avatar'];

    return this.userService.update(id, data, avatar);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin', 'superadmin', 'user'])
  remove(@Param('id') id: string,@Req() req : Request) {
    const userId = req['user']['id']
    const role = req['user']['role']
  
    const sendId = (role === 'user') ? userId : id   
    
    return this.userService.remove(sendId);
  }
}
