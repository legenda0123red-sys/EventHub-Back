
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsUrl,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class EventDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
  @MaxLength(100, { message: 'Название не должно превышать 100 символов' })
  title!: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание обязательно' })
  @MinLength(10, { message: 'Описание должно содержать минимум 10 символов' })
  @MaxLength(2000, { message: 'Описание не должно превышать 2000 символов' })
  description!: string;

  @IsDateString({}, { message: 'Укажите корректную дату в формате ISO 8601' })
  date!: string;

  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес обязателен' })
  @MinLength(5, { message: 'Адрес должен содержать минимум 5 символов' })
  @MaxLength(255, { message: 'Адрес не должен превышать 255 символов' })
  address!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Цена должна быть числом с максимум двумя знаками после запятой' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @Max(10000000, { message: 'Цена слишком большая' })
  price!: number;

  @IsNumber({}, { message: 'Вместимость должна быть числом' })
  @Min(1, { message: 'Вместимость должна быть минимум 1 человек' })
  @Max(1000000, { message: 'Вместимость слишком большая' })
  capacity!: number;

  @IsString({ message: 'Ссылка на изображение должна быть строкой' })
  @IsNotEmpty({ message: 'Изображение обязательно' })
  @MaxLength(2048, { message: 'Ссылка слишком длинная' })
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'Укажите корректную ссылку на изображение' },
  )
  image!: string;
}
