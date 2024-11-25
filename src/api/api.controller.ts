import {Controller, Delete, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiService} from "./api.service";
import {ChatMsgPageableDto} from "../mongo/dto/chat.msg.pageable.dto";
import {Api} from "./commons/api";
import {UserChatDto} from "../mongo/dto/user.chat.dto";
import {ChatDelDto} from "./dto/chat.del.dto";

@Controller(Api.API_PREFIX+Api.CHAT)
@UsePipes(new ValidationPipe({ transform: true}))
export class ApiController {
    constructor(private readonly apiService: ApiService) {
    }

    /**
     * Вернуть переписку с пользователем постранично
     * @param query ChatMsgPageableDto
     */
    @Get(Api.MESSAGES)
    async getChatMessagesByPages(@Query() query: ChatMsgPageableDto) {
       return await this.apiService.getChatMessagesByPages(query);
    }

    /**
     *  Удалить сообщение чата по id
     * @param dto
     */
    @Delete(Api.MESSAGE+'/:id/:fromUserId')
    async delete(@Query() dto: ChatDelDto) {
        return await this.apiService.deleteChatMessage(dto?.id, dto?.fromUserId);
    }

    /**
     * Получить список чатов пользователя
     * @param query UserChatDto
     */
    @Get(Api.USER)
    async getUserChatsByPages(@Query() query: UserChatDto) {
        return await this.apiService.getUserChatsByPages(query);
    }
}
