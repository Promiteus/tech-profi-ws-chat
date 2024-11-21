import {Controller, Delete, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiService} from "./api.service";
import {ChatMsgPageableDto} from "../mongo/dto/chat.msg.pageable.dto";
import {Api} from "./commons/api";

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

    @Delete(Api.MESSAGE+'/:id')
    async delete(@Param('id') id: string) {

        return await this.apiService.deleteChatMessage(id);
    }
}
