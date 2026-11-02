
// import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// export class UserDto {
//   @IsString()
//   @IsNotEmpty()
//   name!: string;

//   @IsEmail()
//   @IsNotEmpty()
//   email!: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(6)
//   password!: string;
// }
// user-dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;


  @IsEnum(['USER', 'ADMIN'])
  @IsString()
  @IsOptional() // Поле необязательное, если фронтенд его не пришлет, сработает дефолт
  role?: string; // <-- ДОБАВЬТЕ ЭТУ СТРОКУ
}
