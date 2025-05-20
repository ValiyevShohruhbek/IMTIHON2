import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger();
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async seedAll() {
    await this.seedUsers();
  }
  async seedUsers() {
    const fullname = this.configService.get('SUPERADMIN_FULLNAME');
    const username = this.configService.get('SUPERADMIN_USERNAME');
    const password = this.configService.get('SUPERADMIN_PASSWORD');
    const hashedPassword = bcrypt.hashSync(password, 12);
    const email = this.configService.get('SUPERADMIN_EMAIL');
    const findSuperadmin = await this.userService.findByEmail(email);
    const data = {
      fullname,
      username,
      password: hashedPassword,
      role: 'superadmin',
      email,
    };
    if (!findSuperadmin) {
      await this.userService.create(data);
      console.log('Super admin yaratildi ');
      return true;
    }
    return true;
  }

  async onModuleInit() {
    try {
      await this.seedAll();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
