import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MongoConfig} from "./mongo.config";
import {ChatModel, ChatSchema} from "./models/chat.model";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useFactory: async (mongoConfig: MongoConfig) => ({
              uri: mongoConfig.getMongoUri(),
          }),
          imports: [MongoModule],
          inject: [MongoConfig],
      }),
      MongooseModule.forFeature([{name: ChatModel.name, schema: ChatSchema}])
  ],
  exports: [MongoConfig],
  providers: [MongoService, MongoConfig]
})
export class MongoModule {}
