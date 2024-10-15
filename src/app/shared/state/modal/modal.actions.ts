import { createAction, props } from "@ngrx/store";
import { RequestFormFields } from "src/types/request-form-fields.enum";

export const saveModalFormData = createAction(
    '[Form] Save Form Data',
    props<{ modalFormData: {
        [RequestFormFields.name]: string,
        [RequestFormFields.phone]: string
    }}>()
);

export const clearModalFormData = createAction(
    '[Form] Clear Form Data'
);