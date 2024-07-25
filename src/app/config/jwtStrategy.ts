import { USER_ROLE } from '@/src/api/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './../../api/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { role } = payload;

    if (role) {
      if (role === USER_ROLE.CUSTOMER) {
        throw new UnauthorizedException(
          "You're not allowed to get access this.",
        );
      }
    }

    return payload;
  }
}
