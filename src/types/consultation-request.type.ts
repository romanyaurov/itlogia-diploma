import { RequestFormFields } from "./request-form-fields.enum"

export type ConsultationRequestType = {
    [RequestFormFields.name]: string,
    [RequestFormFields.phone]: string
}