import { UserInfoKeysEnum } from "./user-info-keys.enum"

export type UserInfoResponseType = {
    [UserInfoKeysEnum.id]: string,
    [UserInfoKeysEnum.name]: string,
    [UserInfoKeysEnum.email]: string
}