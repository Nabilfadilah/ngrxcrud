import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeModel } from "./EmployeeModel";
import { state } from "@angular/animations";

// untuk membuat selector untuk mengambil data dari store menggunakan NgRx.
const getEmployeeState = createFeatureSelector<EmployeeModel>('emp') // Mengambil bagian state 'emp' dari store global

// selector yang mengambil daftar karyawan (list) dari state employee
export const getEmpList = createSelector(getEmployeeState, (state) => {
    return state.list;
})