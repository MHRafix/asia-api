import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../api/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // @InjectModel(User.name) private userModel: Model<UserDocument>
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;
    // console.log(payload);
    // const user = await this.userModel.findById({
    //   _id: id,
    // });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return { id };
  }
}
