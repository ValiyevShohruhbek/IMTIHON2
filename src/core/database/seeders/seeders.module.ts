import { Module } from "@nestjs/common";
import { SeederService } from "./seeders.service";
import { UserModule } from "src/models/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [SeederService],
  exports:[SeederService]
})
export class SeederModule{}