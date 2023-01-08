import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseGuard } from './common/supabase';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(SupabaseGuard)
  @Get('test')
  getTest(): any {
    return this.appService.getTest();
  }
}
