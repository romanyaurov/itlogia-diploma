import { SignupFieldsEnum } from "./signup-fields.enum";

export type SignupPayloadRequestType = {
    [SignupFieldsEnum.name]: string,
    [SignupFieldsEnum.email]: string,
    [SignupFieldsEnum.password]: string,
}