import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MongoConfig {
    constructor(private readonly configService: ConfigService) {
    }

    public getMongoUri() {
        const login = this.configService.getOrThrow('MONGO_LOGIN') ?? '';
        const password = this.configService.getOrThrow('MONGO_PASSWORD') ?? '';
        const host = this.configService.getOrThrow('MONGO_HOST') ?? '';
        const database = this.configService.getOrThrow('MONGO_DB_NAME') ?? '';
        return `mongodb://${login}:${password}@${host}:27017/`
    }
}