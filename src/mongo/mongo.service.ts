import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ChatDocument, ChatModel} from "./models/chat.model";
import {Model} from "mongoose";
import {ChatDto} from "./dto/chat.dto";

@Injectable()
export class MongoService {
    constructor(@InjectModel(ChatModel.name) private readonly  chatModel: Model<ChatDocument>) {
    }

    /**
     * Создать сообщение чата
     * @param chatDto ChatDto
     */
    async create(chatDto: ChatDto) {
        return await new this.chatModel({
            ...chatDto,
            createdAt: new Date(),
        }).save();
    }

    /**
     * Обновить сообщение чата
     * @param id string
     * @param chatDto ChatDto
     */
    async update(id: string, chatDto: ChatDto) {
        return await this.chatModel.findByIdAndUpdate(id, chatDto).exec();
    }

    /**
     * Удалить сообщение чата
     * @param id string
     */
    async delete(id: string): Promise<ChatModel> {
        return await this.chatModel.findByIdAndDelete(id).exec();
    }
}
