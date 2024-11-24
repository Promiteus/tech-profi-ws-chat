import { Module } from '@nestjs/common';
import {ApiService} from "./api.service";
import {MongoModule} from "../mongo/mongo.module";
import { ApiController } from './api.controller';
import {AuthModule} from "../jwt/auth.module";

@Module({
    providers: [ApiService],
    imports: [MongoModule, AuthModule],
    controllers: [ApiController],
})
export class ApiModule {}
