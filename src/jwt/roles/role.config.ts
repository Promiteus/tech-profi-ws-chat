
export class RoleConfig {
    constructor(userTypes: Array<string>, option: string, optionName: string) {
        this.userTypes = userTypes;
        this.option = option;
        this.optionName = optionName;
    }

    userTypes: Array<string> = [];
    option: string = null;
    optionName: string = null;
}