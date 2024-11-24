import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import {RoleValidator} from "./role.validator";
import {JwtCommon} from "../common/JwtCommon";
import {UserDto} from "../dto/user.dto";
import { Request, Response} from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roleValidator: RoleValidator) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const response: Response = context.switchToHttp().getResponse();
    const request: Request = context.switchToHttp().getRequest();
    const jsonStr = response.get(JwtCommon.USER);

    if (!jsonStr) {
      throw new ForbiddenException(JwtCommon.MSG_UNKNOWN_USER())
    }
    const user: UserDto = JSON.parse(jsonStr);
    const key = `${request.method}:${JwtCommon.clearUuidFromUrl(request.originalUrl)}`;
    return this.roleValidator.validate(key, user);
  }
}
