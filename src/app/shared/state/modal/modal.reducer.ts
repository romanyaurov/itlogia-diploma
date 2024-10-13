import { createReducer, on } from "@ngrx/store";
import { clearFormData, saveFormData } from "./modal.actions";

export interface FormState {
    formData: any;
}

export const initialState: FormState = {
    formData: null,
}

export const formReducer = createReducer(
    initialState,
    on(saveFormData, (state, { formData }) => ({
        ...state,
        formData
    })),
    on(clearFormData, (state) => ({
        ...state,
        formData: null
    }))
)