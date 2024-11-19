import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ChatDocument, ChatMessage} from "./models/chat.message";
import {Model} from "mongoose";
import {ChatMessageDto} from "./dto/chat.message.dto";

@Injectable()
export class MongoService {
    constructor(@InjectModel(ChatMessage.name) private readonly  chatModel: Model<ChatDocument>) {
    }

    /**
     * Создать сообщение чата
     * @param chatDto ChatMessageDto
     */
    async create(chatDto: ChatMessageDto) {
        return await new this.chatModel({
            ...chatDto,
            createdAt: new Date(),
            isRead: false,
            isNotified: false
        }).save();
    }

    /**
     * Обновить сообщение чата
     * @param id string
     * @param chatDto ChatMessageDto
     */
    async update(id: string, chatDto: ChatMessageDto) {
        return await this.chatModel.findByIdAndUpdate(id, chatDto).exec();
    }

    /**
     * Удалить сообщение чата
     * @param id string
     */
    async delete(id: string): Promise<ChatMessage> {
        return await this.chatModel.findByIdAndDelete(id).exec();
    }
}
