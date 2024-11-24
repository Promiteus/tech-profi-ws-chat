import { Module } from '@nestjs/common';
import { MongoChatMsgService } from './mongo.chat.msg.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MongoConfig} from "./mongo.config";
import {ChatMessage, ChatSchema} from "./models/chat.message";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useFactory: async (mongoConfig: MongoConfig) => ({
              uri: mongoConfig.getMongoUri()
          }),
          imports: [MongoModule],
          inject: [MongoConfig],
      }),
      MongooseModule.forFeature([{name: ChatMessage.name, schema: ChatSchema}])
  ],
  exports: [MongoConfig, MongoChatMsgService],
  providers: [MongoChatMsgService, MongoConfig]
})
export class MongoModule {}
