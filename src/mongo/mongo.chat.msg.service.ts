import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {ChatDocument, ChatMessage} from "./models/chat.message";
import {Connection, Model} from "mongoose";
import {ChatMessageDto} from "./dto/chat.message.dto";
import {ChatMsgPageableDto} from "./dto/chat.msg.pageable.dto";
import {PageResponse} from "./dto/response/page.response";
import {ApiContants} from "../api/commons/api.contants";
import {UserChatDto} from "./dto/user.chat.dto";

@Injectable()
export class MongoChatMsgService {
    constructor(@InjectModel(ChatMessage.name) private readonly chatModel: Model<ChatDocument>,
                @InjectConnection() private readonly connection: Connection) {
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
     * Получить список чатов пользователя
     * @param dto UserChatDto
     */
    async getChatsByPages(dto: UserChatDto) {
        const skippedItems = +((dto.page) * dto.size);
        return await this.chatModel.aggregate([
         {
            $match: { userId: dto.userId }
         }
        ]).sort({createdAt: "desc"})
          .group({ _id: {userId: "$userId", fromUserId: "$fromUserId"}, unReadCount: {$sum: {$cond: [{$eq:["$isRead", false]}, 1, 0]}}, details: { $first: '$$ROOT' }, })
          .skip(skippedItems)
          .limit(+dto.size)
          .exec();
    }

    /**
     * Удалить сообщение чата
     * @param id string
     */
    async delete(id: string) {
        let session = await this.connection.startSession();
        try {
            session.startTransaction();

            let chatItem = await this.chatModel.findOne({}).where("_id").equals(id).exec();

            if (!chatItem) {
                await session.abortTransaction();
                throw new NotFoundException(ApiContants.MSG_OBJECT_NOT_FOUND(id));
            }

            await this.chatModel.findByIdAndDelete(id).exec();
            await session.commitTransaction();
        } finally {
            await session.endSession();
        }
        return id;
    }
}
