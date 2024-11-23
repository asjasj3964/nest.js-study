import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean, MinLength, MaxLength } from "class-validator";

// CreateTodoDto에서 사용된 것을 그대로 적용한다. 
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty({
        required: true,
        type: String,
        description: 'todo 제목',
        example: '유튜브 강의',
        default: '제목 작성',
        minimum: 2,
        maximum: 15
    })
    @IsString({
        message: '제목은 문자열만 가능합니다.'
    })
    @MinLength(2, {
        message: '제목은 2자 이상이어야 합니다. 입력된 글자: $value',
    })
    @MaxLength(15, {
        message: '제목은 15자를 넘길 수 없습니다. 입력된 글자: $value',
    })
    title: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'todo 설명',
        example: '유튜브 강의',
        default: '설명 작성',
        minimum: 2,
        maximum: 30
    })
    @IsString({
        message: '설명은 문자열만 가능합니다.'
    })
    @MinLength(2, {
        message: '설명은 2자 이상이어야 합니다. 입력된 글자: $value',
    })
    @MaxLength(30, {
        message: '설명은 30자를 넘길 수 없습니다. 입력된 글자: $value',
    })
    description: string;

    @ApiProperty({
        required: true,
        type: String,
        description: '수행 여부 체크',
        example: "true",
        default: false
    })
    @IsBoolean({
        message: '수행 여부는 Boolean 타입만 가능합니다. 입력 값: $value'
    })
    is_done: boolean;
}
