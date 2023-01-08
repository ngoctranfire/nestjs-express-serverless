/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUser } from '@supabase/supabase-js';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(SupabaseStrategy.name);
  constructor(private readonly configService: ConfigService) {
    console.log(
      'Here is my authHeaderasBerer in supabase Strategy',
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
    });
    this.logger.log('Created SupabaseStrategy');
  }

  async validate(user: AuthUser) {
    return user;
  }
}
