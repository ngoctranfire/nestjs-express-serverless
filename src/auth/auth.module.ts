import { Module } from '@nestjs/common';
import { SupabaseModule } from '../common/supabase';
import { AuthResponseResolver } from './graphql';

@Module({
  imports: [SupabaseModule],
  providers: [AuthResponseResolver],
})
export class AuthModule {}
