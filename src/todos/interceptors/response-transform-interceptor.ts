import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// 데이터(Json)로 감싸서 응답한다. 
export interface Response<T>{ 
    message: string;
    statusCode: number;
    data: T;
}
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor <T, Response<T>>{
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const currentStatusCode = context.switchToHttp().getResponse().statusCode;
        const messageFromMetadata = this.reflector
            .get<string>('response-message', context.getHandler());
        return next.handle().pipe(map(data => ({
            message: messageFromMetadata || data.message || '',
            statusCode: currentStatusCode,
            data: data.data || data 
        }))); // 응답 객체 안에 또 다른 data 필드가 있는지 확인 후 data.data가 존재하지 않다면 data 전체를 반환한다.
    }
}