import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/Employee";

// mendefinisikan aksi-aksi yang bisa dipicu dalam store
export const LOAD_EMPLOYEE = 'employee getall'
export const LOAD_EMPLOYEE_SUCCESS = 'employee getall suc'
export const LOAD_EMPLOYEE_FAIL = 'employee getall fail'

export const loadEmployee = createAction(LOAD_EMPLOYEE) // Aksi untuk mengambil data karyawan
export const loadEmployeeSuc = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>()) // Aksi yang dipanggil jika pengambilan data sukses
export const loadEmployeeFail = createAction(LOAD_EMPLOYEE_FAIL, props<{ errMsg: string }>()) // Aksi yang dipanggil jika pengambilan data gagal