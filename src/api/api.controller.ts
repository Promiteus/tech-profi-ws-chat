import {Controller, Get, Query} from '@nestjs/common';
import {ApiService} from "./api.service";
import {ChatMsgPageableDto} from "../mongo/dto/chat.msg.pageable.dto";
import {Api} from "./commons/api";

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {
    }

    /**
     * Вернуть переписку с пользователем постранично
     * @param query ChatMsgPageableDto
     */
    @Get(Api.CHAT+Api.MESSAGES)
    async getChatMessagesByPages(@Query() query: ChatMsgPageableDto) {
       return await this.apiService.getChatMessagesByPages(query);
    }
}
