import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserCreate } from '../auth/dto/create.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: UserCreate) {
    return await this.prisma.users.create({
      data: createUserDto,
      select: { id: true, username: true, role: true, created_at: true },
    });
  }

  async findAll() {
    return await this.prisma.users.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.users.findFirst({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto, avatar: string) {
    if (updateUserDto.email) {
      const checkEmail = await this.findByEmail(updateUserDto.email);
      if (checkEmail)
        throw new ConflictException(
          "Bu email band siz noto'g'ri email kiritdingiz !",
        );
    }
    if (updateUserDto.username) {
      const checkUsername = await this.prisma.users.findFirst({
        where: { username: updateUserDto.username },
      });
      if (checkUsername)
        throw new ConflictException(
          "Bu username band siz noto'g'ri username kiritdingiz !",
        );
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 12);
      updateUserDto.password = hashedPassword;
    }
    const result = await this.prisma.users.update({
      where: { id },
      data: { ...updateUserDto, avatar_url: avatar },
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        phone: true,
        avatar_url: true,
        country: true,
        updated_at: true,
      },
    });

    return { message: 'Malumotlariz yangilandi', data: result };
  }

  async remove(id: string) {
    const checkId = await this.findOne(id);
    if (!checkId)
      throw new BadRequestException('Bunday id li user mavjud emas');
    const result = await this.prisma.users.delete({ where: { id } });
    return { message: "User muvaffaqiyatli o'chirildi !" };
  }
  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({ where: { email } });
  }
}
