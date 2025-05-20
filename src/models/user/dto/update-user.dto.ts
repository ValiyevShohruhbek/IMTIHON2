import { PartialType } from '@nestjs/mapped-types';
import { UserCreate } from 'src/models/auth/dto/create.dto';


export class UpdateUserDto extends PartialType(UserCreate) {}
