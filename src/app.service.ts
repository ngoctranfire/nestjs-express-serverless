import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const result = 2 * 2;
    return JSON.stringify({
      message: 'Hello World!',
      calculation: result,
    });
  }
}
