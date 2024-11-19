import { Module } from '@nestjs/common';
import {WsGateway} from "./ws.gateway";
import {MongoModule} from "../mongo/mongo.module";

@Module({
    imports: [MongoModule],
    providers: [WsGateway]
})
export class WsModule {}
