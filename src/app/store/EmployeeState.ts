import { EmployeeModel } from "./EmployeeModel";

export const employeeState: EmployeeModel = {
    list: [], // Awalnya list kosong (tidak ada data karyawan)
    errormessage: "", // Tidak ada error message saat awal
    empobj: {
        id: 0,
        name: "",
        doj: new Date(),
        role: "",
        salary: 0
    }
}