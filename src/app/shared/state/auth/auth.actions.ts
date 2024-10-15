import { createAction, props } from "@ngrx/store";
import { LoginFieldsEnum } from "src/types/login-fields.enum";
import { RequestFormFields } from "src/types/request-form-fields.enum";

export const saveAuthFormData = createAction(
    '[Form] Save Form Data',
    props<{ authFormData: {
        [LoginFieldsEnum.email]: string,
        [LoginFieldsEnum.password]: string
    }}>()
);

export const clearAuthFormData = createAction(
    '[Form] Clear Form Data'
);