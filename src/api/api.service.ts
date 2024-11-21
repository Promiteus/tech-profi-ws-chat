import { Injectable } from '@nestjs/common';
import {MongoService} from "../mongo/mongo.service";

@Injectable()
export class ApiService {
    constructor(private readonly mongoService: MongoService) {
    }
}
