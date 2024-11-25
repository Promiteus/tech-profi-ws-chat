import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class WsGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let auth: any = context.switchToWs().getClient().handshake.headers.authorization;

        console.warn("auth: "+auth)

        return true;
    }

}