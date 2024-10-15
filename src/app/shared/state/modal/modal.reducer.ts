import { createReducer, on } from "@ngrx/store";
import { clearModalFormData, saveModalFormData } from "./modal.actions";
import { RequestFormFields } from "src/types/request-form-fields.enum";

export interface ModalFormState {
    modalFormData: {
        [RequestFormFields.name]: string,
        [RequestFormFields.phone]: string
    } | null;
}

export const initialState: ModalFormState = {
    modalFormData: null,
}

export const modalFormReducer = createReducer(
    initialState,
    on(saveModalFormData, (state, { modalFormData }) => ({
        ...state,
        modalFormData
    })),
    on(clearModalFormData, (state) => ({
        ...state,
        modalFormData: null
    }))
)