import { Type, applyDecorators } from "@nestjs/common";
import { TodosModule } from "../todos.module";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "../dto/response.dto";

export interface GenericApiResponseOption<TModel extends Type<any>>{
    model: TModel;
    status?: number;
    description?: string;
    isArray?: boolean;
}
export const GenericApiResponse = (option: GenericApiResponseOption<Type>) => {
    const isArray = option.isArray || false;
    if (isArray){
        return applyDecorators(
            ApiResponse({
                status: option.status || 200,
                description: option.description || "성공",
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(ResponseDto) },
                        {
                            properties: {
                                data: {
                                    type: 'array',
                                    items: { 
                                        $ref: getSchemaPath(option.model)
                                    }
                                }
                            }
                        }
                    ]
                }
            })
        );
    }
    return applyDecorators(
        ApiResponse({
            status: option.status || 200,
            description: option.description || "성공",
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                $ref: getSchemaPath(option.model)
                            }
                        }
                    }
                ]
            }
        })
    )
}