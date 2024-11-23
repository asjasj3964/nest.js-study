import { SetMetadata } from "@nestjs/common";

// @ResponseMsg("string")
export const ResponseMsg = (message: string) => SetMetadata('response-message', message); // 입력하고자 하는 데이터를 message에 받는다. 
