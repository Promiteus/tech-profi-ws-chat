import {RoleConfig} from "./role.config";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {UserDto} from "../dto/user.dto";
import {RoleItem} from "./role.item";
import * as fs from "fs";
import {JwtCommon} from "../common/JwtCommon";

@Injectable()
export class RoleValidator {
    private roleConfigMap: Map<string, RoleConfig>;

    constructor() {
        const roleConfigContent = fs.readFileSync(process.cwd()+'/assets/roles.json')?.toString().trim() ?? '';
        if (!roleConfigContent) {
            throw new ForbiddenException(JwtCommon.MSG_ROLES_FILE_EMPTY());
        }

        this.roleConfigMap = new Map<string, RoleConfig>();
        const roleItems: RoleItem[] = JSON.parse(roleConfigContent);
        for (const roleItem of roleItems) {
            this.roleConfigMap.set(`${roleItem.method}:${roleItem.url}`, new RoleConfig(roleItem.roles, roleItem.option, roleItem.optionName))
        }
    }

    /**
     * Чтение конфигурации ролей из roles.json. Возврат: true - разрешено, false - запрещено
     * @param url string
     * @param user UserDto
     */
    public validate(key: string, user: UserDto): boolean {
        let userTypeDtoProps = Object.getOwnPropertyNames(user.userType);

        if (!key || !user) {
            return false;
        }

        const role = this.roleConfigMap.get(key);
        if (!role) {
            return true;
        }

        if (role.userTypes.indexOf(user.userType.name) >= 0) {
           if (!role.option) {
               return true;
           } else if (role.option && role.optionName) {
              if (role.option === JwtCommon.USER_TYPE) {
                  switch (role.optionName) {
                      case userTypeDtoProps[1]:
                          return user.userType.createAdmins;
                      case userTypeDtoProps[2]:
                          return user.userType.editUsers;
                      case userTypeDtoProps[3]:
                          return user.userType.deleteUsers;
                      case userTypeDtoProps[4]:
                          return user.userType.readChats;
                      case userTypeDtoProps[5]:
                          return user.userType.editComments;
                      case userTypeDtoProps[6]:
                          return user.userType.editOrders;
                      case userTypeDtoProps[7]:
                          return user.userType.editRatings;
                      case userTypeDtoProps[8]:
                          return user.userType.editDictionaries;
                      default:
                          return false;
                  }
              }
           }
        } else {
            return false;
        }

        return true;
    }
}