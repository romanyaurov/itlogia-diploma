import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthFormState } from "./auth.reducer";

export const selectAuthFormState = createFeatureSelector<AuthFormState>('modalForm');

export const selectAuthFormData = createSelector(
    selectAuthFormState,
    (state: AuthFormState) => state.authFormData
)