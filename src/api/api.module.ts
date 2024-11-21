import { Module } from '@nestjs/common';
import {ApiService} from "./api.service";
import {MongoModule} from "../mongo/mongo.module";

@Module({
    providers: [ApiService],
    imports: [MongoModule]
})
export class ApiModule {}
