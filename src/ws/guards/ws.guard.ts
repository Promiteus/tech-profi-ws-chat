import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtValidator} from "../../jwt/jwt.validator";
import {WsException} from "@nestjs/websockets";

@Injectable()
export class WsGuard implements CanActivate{
    constructor(private readonly jwtValidator: JwtValidator) {
    }

    async canActivate(context: ExecutionContext) {
        let auth: any = context.switchToWs().getClient().handshake.query;

        const {payload, error} = await this.jwtValidator.validateToken(auth?.jwt)
        if (error) {
            throw new WsException(error)
        }


        return payload != null;
    }

}