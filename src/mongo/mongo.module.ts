import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {MongoConfig} from "./mongo.config";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useFactory: async (mongoConfig: MongoConfig) => ({
              uri: mongoConfig.getMongoUri(),
          }),
          imports: [MongoModule],
          inject: [MongoConfig],
      }),
  ],
  exports: [MongoConfig],
  providers: [MongoService, MongoConfig]
})
export class MongoModule {}
