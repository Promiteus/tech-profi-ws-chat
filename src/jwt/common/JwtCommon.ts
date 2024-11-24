import {UserDto} from "../dto/user.dto";

export class JwtCommon {
    static USERS = 'users';
    static USER = 'user';
    public static USER_TYPE = 'userType';

    public static MSG_ROLES_FILE_EMPTY() {
        return `Файл конфигурации ролей пустой`;
    }

    public static MSG_ACCESS_DENIED(user: UserDto) {
        return `Доступ пользоваетлю '${user.id}:${user.email}' закрыт!`;
    }

    public static MSG_EMPTY_TOKEN() {
        return `Токен не указан`;
    }

    public static MSG_INVALID_TOKEN(err: string) {
        return `Указан неверный токен! ${err ?? ''}`;
    }

    public static MSG_UNKNOWN_USER() {
        return `Неизвестный пользователь! Не удалось получить параметры пользователя.`;
    }

    /**
     * Получить url без параметров
     * @param url string
     */
    public static clearUuidFromUrl(url: string): string {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/g;
        let paths = url.split('/');
        let res = paths.map(item => item.replace(regex, '')).join('/')
        return res.substring(0, res.lastIndexOf('/'));
    }
}