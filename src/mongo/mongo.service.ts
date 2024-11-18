import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ChatDocument, ChatModel} from "./models/chat.model";
import {Model} from "mongoose";

@Injectable()
export class MongoService {
    constructor(@InjectModel(ChatModel.name) private readonly  chatModel: Model<ChatDocument>) {
    }

    /*async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        return await new this.chatModel({
            ...createTodoDto,
            createdAt: new Date(),
        }).save();
    }


    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return await this.chatModel.findByIdAndUpdate(id, updateTodoDto).exec();
    }



    async delete(id: string): Promise<Todo> {
        return await this.chatModel.findByIdAndDelete(id).exec();
    }*/
}
