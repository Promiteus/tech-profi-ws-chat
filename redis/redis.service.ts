import { Injectable } from '@nestjs/common';
import Redis from "ioredis";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RedisService {
    private readonly redisClient: Redis;

    constructor(private readonly configService: ConfigService) {
        this.redisClient = new Redis({
            port: configService.getOrThrow('CACHE_REDIS_PORT'),
            host: configService.getOrThrow('CACHE_REDIS_HOST'),
            password: configService.getOrThrow('CACHE_REDIS_PASSWORD'),
            retryStrategy: function (times) {
                if (times % 10 == 0) {
                    console.error("redisRetryError", 'Redis reconnect exhausted after 10 retries.');
                    return null;
                }
                return 200;
            }
        });


    }

    public async getHashMap(key: string, subKey: string) {
        return await this.redisClient.hmget(key, subKey) ?? '';
    }

    public setHashMap(key: string, subKey: string, value: string) {
        return this.redisClient.hset(key, subKey, value);
    }
}
