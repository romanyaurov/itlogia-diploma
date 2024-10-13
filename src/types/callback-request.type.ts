import { OrderRequestType } from "./order-request.type";
import { RequestFormFields } from "./request-form-fields.enum";
import { RequestTypesEnum } from "./request-types.enum";

export type CallbackRequestType = 
    OrderRequestType & {
        [RequestFormFields.type]: RequestTypesEnum
    }