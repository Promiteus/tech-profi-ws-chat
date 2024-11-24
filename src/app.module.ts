import { Module } from '@nestjs/common';
import {WsModule} from "./ws/ws.module";
import {ConfigModule} from "@nestjs/config";
import { MongoModule } from './mongo/mongo.module';
import { ApiModule } from './api/api.module';


@Module({
  imports: [
    WsModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongoModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
