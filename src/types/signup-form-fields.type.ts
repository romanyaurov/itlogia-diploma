import { SignupFieldsEnum } from "./signup-fields.enum"
import { SignupPayloadRequestType } from "./signup-payload-request.type"

export type SignupFormFieldsType = SignupPayloadRequestType & {
    [SignupFieldsEnum.agreement]: boolean
}