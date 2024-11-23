import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect(); // 모듈이 올라왔을 때 연결을 시도한다(?).
    }
    // async enableShutdownHooks(app: INestApplication){ // 에러 발생(shut down) 시 앱 종료 
    //     this.$on('beforeExit', async () => {
    //         await app.close();
    //     });
    // }
}