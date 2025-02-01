import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./EmployeeState";
import { addEmployeeSuc, deleteEmployeeSuc, getEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployeeSuc } from "./EmployeeAction";
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
    }),

    // reducer delete
    on(deleteEmployeeSuc, (state, action) => {
        const _newdata = state.list.filter(o => o.id != action.empId)
        return {
            ...state,
            list: _newdata, // Mengosongkan daftar karyawan jika gagal
            errormessage: '' // Menyimpan pesan error
        }
    }),

    // reducer add
    on(addEmployeeSuc, (state, action) => {
        const _newdata = { ...action.data }
        return {
            ...state,
            list: [...state.list, _newdata], // Mengosongkan daftar karyawan jika gagal
            errormessage: '' // Menyimpan pesan error
        }
    }),

    on(getEmployee, (state, action) => {
        let _newdata = state.list.find(o => o.id == action.empId);

        if (_newdata == null) {
            _newdata = state.empobj;
        }

        return {
            ...state,
            empobj: _newdata
        };
    })

);

export function employeeReducer(state: any, action: any) {
    return _employeeReducer(state, action);
}