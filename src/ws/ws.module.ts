import { Module } from '@nestjs/common';
import {WsGateway} from "./ws.gateway";
import {MongoModule} from "../mongo/mongo.module";
import {AuthModule} from "../jwt/auth.module";

@Module({
    imports: [MongoModule, AuthModule],
    providers: [WsGateway]
})
export class WsModule {}
