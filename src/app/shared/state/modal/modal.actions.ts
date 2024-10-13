import { createAction, props } from "@ngrx/store";

export const saveFormData = createAction(
    '[Form] Save Form Data',
    props<{ formData: any }>()
);

export const clearFormData = createAction(
    '[Form] Clear Form Data'
);