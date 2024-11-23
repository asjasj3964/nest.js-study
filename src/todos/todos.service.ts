import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaClient } from '@prisma/client';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.client';
 
const prisma = new PrismaClient();

// DB에서 데이터를 가져와 가공해서 주는 부분
@Injectable()
export class TodosService {

  constructor(private prismaService: PrismaService) {}
  async create(createTodoDto: CreateTodoDto) : Promise<Todo>{
    // return `todo를 생성하였습니다.
    // - title: ${createTodoDto.title}
    // - description: ${createTodoDto.description}
    // - is_done: ${createTodoDto.is_done}`;
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,  
        description: createTodoDto.description,
        isDone: createTodoDto.is_done
      },
    })
  }

  async findAll() : Promise<Todo[]>{
    // return `모든 todo를 가져왔습니다.`;
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number) : Promise<Todo>{
    // return `#${id} todo를 가져왔습니다.`;
    // by ID
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) : Promise<Todo> {
    // return `#${id} todo를 업데이트 하였습니다.
    // - title: ${updateTodoDto.title}
    // - description: ${updateTodoDto.description}
    // - is_done: ${updateTodoDto.is_done}`;
    return this.prismaService.todo.update({
      where: {
        id // id: id
      },
      data: {
        // 업데이트 값
        title: updateTodoDto.title,  
        description: updateTodoDto.description,
        isDone: updateTodoDto.is_done
      }
    })
  }

  async remove(id: number) : Promise<Todo> {
    // return `#${id} todo가 삭제되었습니다.`;
    return this.prismaService.todo.delete({
      where: {
        id
      },
    })
  }
}
