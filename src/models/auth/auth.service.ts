import { ConflictException, Injectable } from '@nestjs/common';
import { UserCreate } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async register(data: UserCreate) {
    const findUser = await this.userService.findByEmail(data.email);
    if (findUser)
      throw new ConflictException('Bu emaildan oldin foydalanilgan');

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newData = { ...data, password: hashedPassword };

    const user = await this.userService.create(newData);
    const { id, role } = user;

    const token = await this.jwt.signAsync({ id, role });

    return {
      message: "Muvaffaqiyatli ro'yhatdan o'tdingiz !",
      data: user,
      token,
    };
  }

  async login(data: LoginDto) {
    const checkEmail = await this.userService.findByEmail(data.email);
    if (!checkEmail) throw new ConflictException('Bu email yoki password xato');

    const checkPassword = await bcrypt.compare(
      data.password,
      checkEmail.password,
    );
    if (!checkPassword)
      throw new ConflictException('Bu email yoki password xato');
    const { id, role } = checkEmail;

    const join = await this.prisma.$queryRawUnsafe(`
      SELECT users.id AS user_id,users.username,users.role,
             subscription_plans.name AS plan_name,
             user_subscriptions.end_date AS expires_at
      FROM users
      LEFT JOIN user_subscriptions ON user_subscriptions.user_id = users.id
      LEFT JOIN subscription_plans ON subscription_plans.id = user_subscriptions.plan_id where users.email = $1
    `,`${data.email}`);
      
    const token = await this.jwt.signAsync({ id, role });
    return { message: 'Tizimga muvaffaqiyatli kirildi', data: join,token };
  }
}
