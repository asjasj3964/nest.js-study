import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma.client';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService], // todo controller에서 prisma를 사용할 수 있게 된다. 
})
export class TodosModule {}
