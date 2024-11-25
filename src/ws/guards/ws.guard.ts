import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class WsGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let auth: any = context.switchToWs().getClient().handshake.query;

        console.warn("auth: "+JSON.stringify(auth))

        return true;
    }

}