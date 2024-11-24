import { Module } from '@nestjs/common';
import { JwtValidator } from './jwt.validator';
import {JwtService} from "@nestjs/jwt";
import {JwtMiddleware} from "./middlewares/jwt.middleware";
import {RoleGuard} from "./roles/role.guard";
import {RoleValidator} from "./roles/role.validator";
import {RedisModule} from "../../redis/redis.module";

@Module({
  providers: [
    JwtValidator,
    JwtService,
    JwtMiddleware,
    RoleValidator,
    RoleGuard,
  ],
  exports: [
    JwtValidator,
    JwtMiddleware,
    RoleGuard,
    RoleValidator,
  ],
  imports: [
      RedisModule,
  ]
})
export class AuthModule {}
