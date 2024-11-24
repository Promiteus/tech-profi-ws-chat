import { Module } from '@nestjs/common';
import {WsModule} from "./ws/ws.module";
import {ConfigModule} from "@nestjs/config";
import { MongoModule } from './mongo/mongo.module';
import { ApiModule } from './api/api.module';
import {join} from "path"
import {ServeStaticModule} from "@nestjs/serve-static";
import {RedisModule} from "../redis/redis.module";


@Module({
  imports: [
    WsModule,
    RedisModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongoModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
