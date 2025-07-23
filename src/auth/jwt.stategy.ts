import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from './dto/user_payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'conectar-secret',
    });
  }
  validate(args: UserPayload) {
    return {
      userId: args.sub,
      email: args.email,
      role: args.role,
    };
  }
}
