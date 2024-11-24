import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {JwtValidator} from "../jwt.validator";
import {JwtCommon} from "../common/JwtCommon";
import {RedisService} from "../../../redis/redis.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authValidator: JwtValidator,
              private readonly redisService: RedisService) {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    let payload = await this.authValidator.validate(req);
    let user = (await this.redisService.getHashMap(JwtCommon.USERS, payload?.sub))[0] ?? null;
    res.setHeader(JwtCommon.USER, user)
    next();
    if (user) {
      let userDto = JSON.parse(user);
      res.setHeader(JwtCommon.USER, JSON.stringify(userDto?.userType) ?? '')
    }
  }
}
