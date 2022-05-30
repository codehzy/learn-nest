import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
