# EventHub Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  Backend часть платформы EventHub, разработанная с использованием NestJS, TypeScript, Prisma ORM и PostgreSQL.
</p>

## Description

EventHub — платформа для просмотра и создания мероприятий.

Backend предоставляет API для:
- Регистрации и авторизации пользователей.
- JWT-аутентификации.
- Управления профилем пользователя.
- Создания, редактирования и удаления мероприятий.
- Управления пользователями и ролями.
- Работы с базой данных PostgreSQL.

## Technologies & Versions

| Technology | Version | Purpose |
|---|---|---|
| NestJS | 11.0.1 | Backend framework |
| TypeScript | 5.7.3 | Programming language |
| Prisma ORM | 7.10.0 | Database ORM |
| Prisma Client | 7.10.1 | Database queries |
| PostgreSQL |  —  | Database |
| @prisma/adapter-pg | 7.10.0 | PostgreSQL adapter |
| Node.js | — | JavaScript runtime |
| JWT | 11.0.2 | Authentication |
| Passport | 0.7.0 | Authentication |
| Passport JWT | 4.0.1 | JWT strategy |
| Swagger | 11.4.7 | API documentation |
| bcrypt | 6.0.0 | Password hashing |
| Class Validator | 0.15.1 | Data validation |
| Class Transformer | 0.5.1 | Data transformation |
| Jest | 30.0.0 | Testing |
| ESLint | 9.18.0 | Code linting |
| Prettier | 3.4.2 | Code formatting |


## Project setup

### 1. Clone repository

```bash
git clone <BACKEND_REPOSITORY_URL>
```

Перейдите в папку проекта:

```bash
cd event-hub-back
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Создайте файл `.env` в корне проекта.

Пример настройки:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="your_secret_key"
```

Укажите собственные данные PostgreSQL и секретный ключ JWT.

### 4. Database setup

Перед запуском проекта убедитесь, что PostgreSQL установлен и база данных создана.

Сгенерируйте Prisma Client:

```bash
npm run prisma:generate
```

Примените миграции:

```bash
npm run prisma:migrate
```

## Prisma Commands

| Command | Description |
|---|---|
| `npm run prisma:generate` | Генерирует Prisma Client |
| `npm run prisma:migrate` | Создаёт и применяет миграции |
| `npm run prisma:studio` | Открывает Prisma Studio |
| `npm run prisma:seed` | Запускает заполнение базы начальными данными |
| `npm run prisma:reset` | Сбрасывает базу данных и применяет миграции заново |
| `npm run prisma:pull` | Получает структуру существующей БД в `schema.prisma` |
| `npm run prisma:push` | Синхронизирует Prisma Schema с базой данных |

**Важно:**
- `prisma:migrate` используется при разработке.
- `prisma:pull` нужен для получения структуры уже существующей базы данных.
- `prisma:push` не создаёт историю миграций.
- `prisma:reset` удаляет данные и пересоздаёт базу по миграциям. Используйте осторожно.
- `prisma:seed` требует наличия файла `prisma/seed.ts`.

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# debug mode
npm run start:debug

# production mode
npm run start:prod
```

## API Documentation

Для документации API используется Swagger.

После запуска backend откройте:

```text
http://localhost:8080/api
```

Если в `main.ts` настроен другой порт, используйте его.

## Run tests

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# test coverage
npm run test:cov

# debug tests
npm run test:debug

# e2e tests
npm run test:e2e
```

## Code formatting and linting

Форматирование кода:

```bash
npm run format
```

Проверка и автоматическое исправление ESLint:

```bash
npm run lint
```

## Useful resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Swagger Documentation](https://swagger.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

This project is for educational and development purposes.