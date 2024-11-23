import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './todos/interceptors/logging-interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('todo API')
    .setDescription('todo API 문서')
    .setVersion('1.0')
    .addTag('todos', 'todo 관련 API')
    .addBearerAuth()
    .setTermsOfService('https://docs.nestjs.com/')
    .setContact('담당자', 'https://github.com/asjasj3964', 'ahnnn000@gmail.com')
    .setLicense('MIT', 'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txt')
    .addServer('http://127.0.0.1:3000/', 'develop') // 서버 추가
    .addServer('http://localhost:4000/', 'stagging') // 이후 API 배포 시 테스트용과 실제 배포용과 주소가 다를 수 있는 경우에 체크하기 위함 
    .addServer('https://github.com/asjasj3964/', 'production')
    .build(); // 빌드를 통해 openAPIObject를 가져온다. 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT ?? 3000); /// 3000 포트에 서버가 돌아간다. 

}
bootstrap();
