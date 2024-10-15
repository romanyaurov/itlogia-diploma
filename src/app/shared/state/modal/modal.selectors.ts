import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModalFormState } from "./modal.reducer";

export const selectModalFormState = createFeatureSelector<ModalFormState>('modalForm');

export const selectModalFormData = createSelector(
    selectModalFormState,
    (state: ModalFormState) => state.modalFormData
)