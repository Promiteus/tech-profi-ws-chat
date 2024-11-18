import { Module } from '@nestjs/common';
import {WsModule} from "./ws/ws.module";
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
    WsModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
