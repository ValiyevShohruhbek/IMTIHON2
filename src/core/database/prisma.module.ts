import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { SeederModule } from "./seeders/seeders.module";
@Global()
@Module({
  imports: [SeederModule],
  providers: [PrismaService],
  exports:[PrismaService]
})
export class DatabaseModule{}