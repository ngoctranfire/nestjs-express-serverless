import { Module } from '@nestjs/common';
import { SupabaseModule } from '../common/supabase';

@Module({
  imports: [SupabaseModule],
})
export class ProfileModule {}
