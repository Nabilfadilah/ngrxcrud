import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./EmployeeState";
import { loadEmployeeFail, loadEmployeeSuc } from "./EmployeeAction";
import { state } from "@angular/animations";

// reducer untuk menangani perubahan state berdasarkan aksi yang terjadi
const _employeeReducer = createReducer(employeeState,
    on(loadEmployeeSuc, (state, action) => {
        return {
            ...state,
            list: action.list, // Memperbarui daftar karyawan dengan data dari aksi
            errormessage: ''
        }
    }),
    on(loadEmployeeFail, (state, action) => {
        return {
            ...state,
            list: [], // Mengosongkan daftar karyawan jika gagal
            errormessage: action.errMsg // Menyimpan pesan error
        }
    })
);

export function employeeReducer(state: any, action: any) {
    return _employeeReducer(state, action);
}