import { Module } from '@nestjs/common';
import {WsModule} from "./ws/ws.module";
import {ConfigModule} from "@nestjs/config";
import { MongoModule } from './mongo/mongo.module';


@Module({
  imports: [
    WsModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
