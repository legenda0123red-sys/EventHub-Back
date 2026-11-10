
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsInt,
  IsUrl,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({
    description: 'Название мероприятия',
    example: 'Летний джаз',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
  @MaxLength(100, { message: 'Название не должно превышать 100 символов' })
  title: string;

  @ApiProperty({
    description: 'Описание мероприятия',
    example: 'Большой концерт джазовой музыки под открытым небом',
    minLength: 10,
    maxLength: 2000,
  })
  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание обязательно' })
  @MinLength(10, { message: 'Описание должно содержать минимум 10 символов' })
  @MaxLength(2000, { message: 'Описание не должно превышать 2000 символов' })
  description: string;

  @ApiProperty({
    description: 'Дата проведения мероприятия в формате ISO 8601',
    example: '2027-06-12T19:00:00.000Z',
    format: 'date-time',
  })
  @IsDateString({}, { message: 'Укажите корректную дату в формате ISO 8601' })
  date: string;

  @ApiProperty({
    description: 'Адрес проведения мероприятия',
    example: 'Москва, ул. Каретный Ряд, 3',
    minLength: 5,
    maxLength: 255,
  })
  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес обязателен' })
  @MinLength(5, { message: 'Адрес должен содержать минимум 5 символов' })
  @MaxLength(255, { message: 'Адрес не должен превышать 255 символов' })
  address: string;

  @ApiProperty({
    description: 'Стоимость участия в мероприятии',
    example: 1200.5,
    minimum: 0,
    maximum: 10000000,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Цена должна быть числом с максимум двумя знаками после запятой',
    },
  )
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @Max(10000000, { message: 'Цена слишком большая' })
  price: number;

  @ApiProperty({
    description: 'Максимальное количество участников',
    example: 200,
    minimum: 1,
    maximum: 1000000,
  })
  @IsInt({ message: 'Вместимость должна быть целым числом' })
  @Min(1, { message: 'Вместимость должна быть минимум 1 человек' })
  @Max(1000000, { message: 'Вместимость слишком большая' })
  capacity: number;

  @ApiProperty({
    description: 'Ссылка на изображение мероприятия',
    example: 'https://example.com/jazz.jpg',
    maxLength: 2048,
  })
  @IsString({ message: 'Ссылка на изображение должна быть строкой' })
  @IsNotEmpty({ message: 'Изображение обязательно' })
  @MaxLength(2048, { message: 'Ссылка слишком длинная' })
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'Укажите корректную ссылку на изображение' },
  )
  image: string;

  @ApiPropertyOptional({
    description: 'Категория мероприятия',
    example: 'Музыка',
    maxLength: 50,
  })
  @IsString({ message: 'Категория должна быть строкой' })
  @IsOptional()
  @MaxLength(50, { message: 'Категория не должна превышать 50 символов' })
  category?: string;
}
