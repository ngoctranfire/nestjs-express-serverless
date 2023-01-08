import {
  Injectable,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { Supabase, SupabaseGuard } from './common/supabase';

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}
  getHello(): string {
    const result = 2 * 2;
    return JSON.stringify({
      message: 'Hello World!',
      calculation: result,
    });
  }

  async getTest(): Promise<any> {
    const { data, error } = await this.supabase.getClient().auth.getUser();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
