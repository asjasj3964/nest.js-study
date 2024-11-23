import { Injectable } from '@nestjs/common';

// 화면이 나가기 전의(controller에 데이터를 주기 전의) 처리
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
