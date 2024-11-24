import {IoAdapter} from "@nestjs/platform-socket.io";
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export class RedisIoAdapter extends IoAdapter{
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(app: INestApplication): Promise<void> {
        let config = app.get(ConfigService);
        const host = config.getOrThrow('WS_REDIS_HOST') ?? 'localhost';
        const port = config.getOrThrow('WS_REDIS_PORT') ?? 6379;
        const password = config.getOrThrow('WS_REDIS_PASSWORD') ?? '';

        const pubClient = createClient({ url: `redis://${host}:${port}`, password: password });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}