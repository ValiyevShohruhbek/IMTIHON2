import { Module } from '@nestjs/common';
import { AdminPanelController } from './admin.controller';
import { AdminPanelService } from './admin.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      dest: '/uploads',
      storage: diskStorage({
        filename: (req, file, callback) => {
          const extname = path.extname(file.originalname);
          const fileName = `${uuid()}${extname}`;
          callback(null, fileName);
          req['avatar'] = fileName;
        },
        destination: './uploads',
      }),
    }),
  ],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
