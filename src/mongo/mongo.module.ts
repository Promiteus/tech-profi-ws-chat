import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
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
  exports: [MongoConfig, MongoService],
  providers: [MongoService, MongoConfig]
})
export class MongoModule {}
