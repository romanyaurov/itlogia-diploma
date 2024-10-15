import { createReducer, on } from "@ngrx/store";
import { LoginFieldsEnum } from "src/types/login-fields.enum";
import { clearAuthFormData, saveAuthFormData } from "./auth.actions";

export interface AuthFormState {
    authFormData: {
        [LoginFieldsEnum.email]: string,
        [LoginFieldsEnum.password]: string
    } | null;
}

export const initialState: AuthFormState = {
    authFormData: null,
}

export const authFormReducer = createReducer(
    initialState,
    on(saveAuthFormData, (state, { authFormData }) => ({
        ...state,
        authFormData
    })),
    on(clearAuthFormData, (state) => ({
        ...state,
        authFormData: null
    }))
)