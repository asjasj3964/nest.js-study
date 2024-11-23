import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todos/interceptors/response-transform-interceptor';
import { ResponseMsg } from './todos/decorators/response-message-decorator';

// 데코레이터 -> 로직
@Controller('root') // /root 경로로 접속 시
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name') // name으로 파라미터를 준다.
  @ResponseMsg("성공적으로 들어왔습니다.")
  getHello(@Param('name') name: string) {
    // return `${name}의 Nest.js 공부`;
    // return this.appService.getHello();
    return {
      data: `${name}의 Nest.js 공부`,
      message: "메시지메시지메시지"
    }
  }
}
