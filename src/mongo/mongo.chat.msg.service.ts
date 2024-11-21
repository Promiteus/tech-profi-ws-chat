import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ChatDocument, ChatMessage} from "./models/chat.message";
import {Model} from "mongoose";
import {ChatMessageDto} from "./dto/chat.message.dto";
import {ChatMsgPageableDto} from "./dto/chat.msg.pageable.dto";
import {PageResponse} from "./dto/response/page.response";

@Injectable()
export class MongoChatMsgService {
    constructor(@InjectModel(ChatMessage.name) private readonly chatModel: Model<ChatDocument>) {
    }

    /**
     * Вернуть переписку с пользователем постранично
     * @param dto ChatMsgPageableDto
     */
    async getByPages(dto: ChatMsgPageableDto) {
        const skippedItems = (dto.page) * dto.size;
        let result = await this.chatModel
              .find({
                  $or:[
                      {'fromUserId': dto.fromUserId, 'userId': dto.userId},
                      {'fromUserId': dto.userId, 'userId': dto.fromUserId},
                  ]
              })
             .sort({createdAt: "desc"})
             .skip(skippedItems)
             .limit(dto.size)
             .exec();
        return new PageResponse(result, dto.page, dto.size);
    }

    /**
     * Создать сообщение чата
     * @param chatDto ChatMessageDto
     */
    async create(chatDto: ChatMessageDto) {
        let data = {
            ...chatDto,
            createdAt: new Date(),
            isRead: false,
            isNotified: false
        };
        return await new this.chatModel(data).save();
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
