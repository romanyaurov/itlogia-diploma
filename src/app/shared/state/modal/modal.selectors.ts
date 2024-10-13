import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FormState } from "./modal.reducer";

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormData = createSelector(
    selectFormState,
    (state: FormState) => state.formData
);