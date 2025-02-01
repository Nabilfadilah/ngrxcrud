import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/Employee";

// mendefinisikan aksi-aksi yang bisa dipicu dalam store
export const LOAD_EMPLOYEE = 'employee getall'
export const LOAD_EMPLOYEE_SUCCESS = 'employee getall suc'
export const LOAD_EMPLOYEE_FAIL = 'employee getall fail'

export const DELETE_EMPLOYEE = '[employee] delete'
export const DELETE_EMPLOYEE_SUCCESS = '[employee] delete succ'

export const loadEmployee = createAction(LOAD_EMPLOYEE) // Aksi untuk mengambil data karyawan
export const loadEmployeeSuc = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>()) // Aksi yang dipanggil jika pengambilan data sukses
export const loadEmployeeFail = createAction(LOAD_EMPLOYEE_FAIL, props<{ errMsg: string }>()) // Aksi yang dipanggil jika pengambilan data gagal

export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{ empId: number }>()) // Aksi untuk mengambil data karyawan berdasasrkan empId
export const deleteEmployeeSuc = createAction(DELETE_EMPLOYEE_SUCCESS, props<{ empId: number }>()) // Aksi yang dipanggil jika pengambilan data sukses

export const emptyAction = createAction('empty')