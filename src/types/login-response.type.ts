import { TokensKeysEnum } from "./tokens-keys.enum"

export type LoginResponseType = {
    [TokensKeysEnum.accessToken]: string,
    [TokensKeysEnum.refreshToken]: string,
    [TokensKeysEnum.userId]: string
}