import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ApiService} from "./api.service";
import {MongoModule} from "../mongo/mongo.module";
import { ApiController } from './api.controller';
import {AuthModule} from "../jwt/auth.module";
import {JwtMiddleware} from "../jwt/middlewares/jwt.middleware";
import {RedisModule} from "../../redis/redis.module";
import {UserMiddleware} from "./middlewares/user.middleware";
import {Api} from "./commons/api";

@Module({
    providers: [ApiService],
    imports: [
        MongoModule,
        AuthModule,
        RedisModule
    ],
    controllers: [ApiController],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        });
        consumer.apply(UserMiddleware).forRoutes({
            path: `*${Api.CHAT}*`,
            method: RequestMethod.ALL
        })
    }
}
