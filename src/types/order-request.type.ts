import { ConsultationRequestType } from "./consultation-request.type";
import { OrderServicesEnum } from "./order-services.enum";
import { RequestFormFields } from "./request-form-fields.enum";

export type OrderRequestType = 
    ConsultationRequestType & {
        [RequestFormFields.service]: OrderServicesEnum
    }