import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, HttpCode, HttpStatus, Res, HttpException, UseInterceptors } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { ResponseMsg } from './decorators/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';
import { ApiBasicAuth, ApiBearerAuth, ApiExtraModels, ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { ResponseDto } from './dto/response.dto';
import { GenericApiResponse } from './decorators/generic-response-decorator';

// /서버-루트/todos
// @UseInterceptors(LoggingInterceptor)
@ApiTags('todos')
@UseInterceptors(ResponseTransformInterceptor)
@ApiExtraModels(ResponseDto)
@Controller('todos')
// @ApiHeader({
//   name: 'My Header',
//   description: 'Custom Header'
// })
//@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // @HttpCode(HttpStatus.OK) //  @HttpCode(200)
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  // @Post()
  // async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response){
  //   const createdTodo = await this.todosService.create(createTodoDto);
  //   res.status(HttpStatus.OK)
  //     .json({
  //         message: "성공적으로 todo가 생성되었습니다.",
  //         statusCode: 200,
  //         data: createTodoDto
  //     });
  // }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg("성공적으로 todo가 생성되었습니다.")
  // @ApiResponse({status: 201, description: '<b>성공적으로 todo가 생성되었습니다.</b>'})
  // @ApiOkResponse({
  //   description: '<b>성공적으로 todo가 생성되었습니다.</b>',
  //   type: TodoDto
  // })
  // @ApiResponse({status: 403, description: 'todo를 생성할 수 없습니다.'})
  @ApiForbiddenResponse({description: 'todo를 생성할 수 없습니다.'})
  @ApiOperation({
    summary: 'todo 추가',
    description: `## todo 추가
      - 문자열로 작성
      - 2자 이상 30자 이하로 작성`,
    //deprecated: true, // true -> 안 쓰는 API 표시
    deprecated: false,
    externalDocs: {
      description: '### 외부 문서',
      url: 'https://docs.nestjs.com/'
    }
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '<b>성공적으로 todo가 생성되었습니다.</b>',
  //   schema: {
  //     allOf: [
  //       {$ref: getSchemaPath(ResponseDto)},
  //       {
  //         properties: {
  //           data: {
  //               $ref: getSchemaPath(TodoDto),
  //           }
  //         }
  //       }
  //     ]
  //   }
  // })
  @GenericApiResponse({ 
    model: TodoDto,
    status: 200,
    description: '<b>성공적으로 todo가 생성되었습니다.</b>',
    isArray: false,
  })
  async create(@Body() createTodoDto: CreateTodoDto){
    const createdTodo = await this.todosService.create(createTodoDto);
    return createTodoDto
  }

  @Get()
  //@ApiBearerAuth()
  @HttpCode(HttpStatus.OK) 
  @ResponseMsg("성공적으로 모든 todo를 조회하였습니다.")
  // @ApiOkResponse({
  //   description: '<b>성공적으로 모든 todo가 조회하였습니다.</b>',
  //   type: TodoDto,
  //   isArray: true
  // })
  @ApiForbiddenResponse({description: '모든 todo를 조회할 수 없습니다.'})
  @ApiOperation({
    summary: '모든 todo 조회',
    description: `## 모든 todo 조회`,
    //deprecated: true, // true -> 안 쓰는 API 표시
    deprecated: false,
    externalDocs: {
      description: '### 외부 문서',
      url: 'https://docs.nestjs.com/'
    }
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '<b>성공적으로 모든 todo가 조회하였습니다.</b>',
  //   schema: {
  //     allOf: [
  //       {$ref: getSchemaPath(ResponseDto)},
  //       {
  //         properties: {
  //           data: {
  //             type: 'array',
  //             items: {
  //               $ref: getSchemaPath(TodoDto),
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   }
  // })
  @GenericApiResponse({ 
    model: TodoDto,
    status: 200,
    description: '<b>성공적으로 모든 todo가 조회하였습니다.</b>',
    isArray: true,
  })
  async findAll() { 
    const fetchedTodos = await this.todosService.findAll();
    return fetchedTodos
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) 
  @ResponseMsg(`성공적으로 해당 todo를 조회하였습니다.`)
  // @ApiOkResponse({
  //   description: '<b>성공적으로 해당 todo를 조회하였습니다.</b>',
  //   type: TodoDto
  // })
  @ApiForbiddenResponse({description: '해당 todo를 조회할 수 없습니다.'})
  @ApiOperation({
    summary: '특정 todo 조회',
    description: `특정 todo 조회`,
    //deprecated: true, // true -> 안 쓰는 API 표시
    deprecated: false,
    externalDocs: {
      description: '### 외부 문서',
      url: 'https://docs.nestjs.com/'
    }
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '<b>성공적으로 해당 todo를 조회하였습니다.</b>',
  //   schema: {
  //     allOf: [
  //       {$ref: getSchemaPath(ResponseDto)},
  //       {
  //         properties: {
  //           data: {
  //               $ref: getSchemaPath(TodoDto),
  //           }
  //         }
  //       }
  //     ]
  //   }
  // })
  @GenericApiResponse({ 
    model: TodoDto,
    //status: 200,
    description: '<b>성공적으로 해당 todo를 조회하였습니다.</b>',
    // isArray: false,
  })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const fetchedTodo = await this.todosService.findOne(+id);
    if (fetchedTodo == null){
      throw new HttpException(`#${id} todo를 찾지 못했습니다.`, HttpStatus.NOT_FOUND);
    }
    return fetchedTodo
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK) 
  @ResponseMsg("성공적으로 해당 todo를 업데이트 하였습니다.")
  // @ApiOkResponse({
  //   description: '<b>성공적으로 해당 todo를 업데이트 하였습니다.</b>',
  //   type: TodoDto
  // })
  @ApiForbiddenResponse({description: '해당 todo를 업데이트 할 수 없습니다.'})
  @ApiOperation({
    summary: '특정 todo 업데이트',
    description: `특정 todo 업데이트`,
    //deprecated: true, // true -> 안 쓰는 API 표시
    deprecated: false,
    externalDocs: {
      description: '### 외부 문서',
      url: 'https://docs.nestjs.com/'
    }
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '<b>성공적으로 해당 todo를 업데이트 하였습니다.</b>',
  //   schema: {
  //     allOf: [
  //       {$ref: getSchemaPath(ResponseDto)},
  //       {
  //         properties: {
  //           data: {
  //               $ref: getSchemaPath(TodoDto),
  //           }
  //         }
  //       }
  //     ]
  //   }
  // })
  @GenericApiResponse({ 
    model: TodoDto,
    status: 200,
    description: '<b>성공적으로 해당 todo를 업데이트 하였습니다.</b>',
    isArray: false,
  })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const fetchedTodo = await this.todosService.findOne(+id);
    if (fetchedTodo == null){
      throw new HttpException(`#${id} todo를 찾지 못하였습니다.`, HttpStatus.NOT_FOUND);
    }
    const updatedTodo = await this.todosService.update(+id, updateTodoDto)
    return updatedTodo
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  @ResponseMsg("성공적으로 해당 todo를 삭제하였습니다.")
  @ApiResponse({
    status: 999,
    description: '.',
    type: TodoDto
  })
  @ApiForbiddenResponse({description: '해당 todo를 삭제할 수 없습니다.'})
  @ApiOperation({
    summary: '특정 todo 삭제',
    description: `특정 todo 삭제`,
    //deprecated: true, // true -> 안 쓰는 API 표시
    deprecated: false,
    externalDocs: {
      description: '### 외부 문서',
      url: 'https://docs.nestjs.com/'
    }
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '<b>성공적으로 해당 todo를 삭제하였습니다.</b>',
  //   schema: {
  //     allOf: [
  //       {$ref: getSchemaPath(ResponseDto)},
  //       {
  //         properties: {
  //           data: {
  //               $ref: getSchemaPath(TodoDto),
  //           }
  //         }
  //       }
  //     ]
  //   }
  // })
  @GenericApiResponse({ 
    model: TodoDto,
    status: 200,
    description: '<b>성공적으로 해당 todo를 삭제하였습니다.</b>',
    isArray: false,
  })
  async remove(@Param('id') id: string) {
    const fetchedTodo = await this.todosService.findOne(+id);
    if (fetchedTodo == null){
      throw new HttpException(`#${id} todo를 찾지 못하였습니다.`, HttpStatus.NOT_FOUND);
    }
    const deletedTodo = await this.todosService.remove(+id);
    //return this.todosService.remove(+id);
    return deletedTodo
  }
}

// 미션 - 응답 처리 제네릭하게 적용하기