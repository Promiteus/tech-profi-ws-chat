import {UserTypeDto} from "./user.type.dto";

export class UserDto {
    id: string;
    email: string;
    deleted: boolean;
    phone: string;
    code: number;
    created: Date = new Date();
    active: boolean;
    userType: UserTypeDto;
}