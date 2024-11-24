import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtCommon} from "../../jwt/common/JwtCommon";
import {UserTypes} from "../../jwt/common/user.types";
import {JwtValidator} from "../../jwt/jwt.validator";


@Injectable()
export class UserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const user = JwtValidator.getUserFromHeader(res);

        const userId = req.query['userId'] ?? '';
        const tokenUserId = user?.id ?? '';

        if (user?.userType.name === UserTypes?.user) {
           if (tokenUserId !== userId) {
               throw new UnauthorizedException(JwtCommon.MSG_ACCESS_DENIED(user));
           }
        }
        next();
    }
}