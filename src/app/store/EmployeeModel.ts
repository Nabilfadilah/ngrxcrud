import { Employee } from "../model/Employee";

export interface EmployeeModel {
    list: Employee[], // Menyimpan daftar karyawan dalam bentuk array
    errormessage: string // Menyimpan pesan kesalahan jika terjadi error
}