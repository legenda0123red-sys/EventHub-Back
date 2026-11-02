// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// interface JwtPayload {
//   sub: number;
//   email: string;
//   role: string;
//   name: string
// }

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     // super({
//     //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     //   ignoreExpiration: false,
//     //   secretOrKey: process.env.JWT_SECRET,
//     // });
//     super({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   ignoreExpiration: false,
//   secretOrKey: process.env.JWT_SECRET || 'dev-secret-key-placeholder',
// });

//   }

//   validate(payload: JwtPayload) {
//     return payload;
//   }
// }

// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Импортируем ConfigService

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) { // Внедряем через DI
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'), // Берем ключ отсюда
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}

