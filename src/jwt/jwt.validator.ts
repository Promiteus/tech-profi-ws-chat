import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {JwtCommon} from "./common/JwtCommon";
import * as fs from "fs";
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from 'express';
import {UserDto} from "./dto/user.dto";
import {WsException} from "@nestjs/websockets";

@Injectable()
export class JwtValidator {
    private readonly secret: string;
    private log: Logger = new Logger();

    constructor(private jwtService: JwtService) {
       this.secret = fs.readFileSync(process.cwd()+'/assets/public.key').toString().trim();
    }

    /**
     * Извлечь сигнатуру пользователя из заголовка
     * @param response Response
     */
    public static getUserFromHeader(response: Response) {
        const jsonStr = response.get(JwtCommon.USER);
        let user: UserDto = null;
        if (jsonStr) {
            user = JSON.parse(jsonStr);
        }

        if (!user) {
            throw new UnauthorizedException(JwtCommon.MSG_UNKNOWN_USER());
        }
        return user;
    }

    /**
     * Проверить токен на правильность и извлечь тело
     * @param request Request
     */
    public async validate(request: Request) {
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException(JwtCommon.MSG_EMPTY_TOKEN());
        }
        let payload;
        try {
             payload = await this.jwtService.verifyAsync(token, {secret: this.secret})
        } catch (e) {
            throw new UnauthorizedException(JwtCommon.MSG_INVALID_TOKEN(e));
        }

        return payload
    }

    public async validateToken(token: string) {
        if (!token) {
            throw new UnauthorizedException(JwtCommon.MSG_EMPTY_TOKEN());
        }
        let payload = null;
        try {
            payload = await this.jwtService.verifyAsync(token, {secret: this.secret})
        } catch (e) {            //throw new UnauthorizedException(JwtCommon.MSG_INVALID_TOKEN(e));
            this.log.error(`${this} ${e?.toString()}`)
            return {payload: null, error: e?.toString()}
        }

        return {payload: payload, error: null}
    }

    private extractToken(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token: null;
    }
}
