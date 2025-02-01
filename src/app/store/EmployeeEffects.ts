import { inject, Injectable } from "@angular/core";
import { EmployeeService } from "../service/employee.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addEmployee, addEmployeeSuc, deleteEmployee, deleteEmployeeSuc, emptyAction, loadEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployee, updateEmployeeSuc } from "./EmployeeAction";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class empEffect {

    actions$ = inject(Actions); // Observable yang berisi aksi-aksi yang terjadi di store
    service = inject(EmployeeService); // Service untuk memanggil API
    toastr = inject(ToastrService); // mengambil alert

    // mengambil data
    _loadEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEmployee), // Menunggu aksi `loadEmployee`
            exhaustMap((action) => {
                return this.service.GetAll().pipe( // Memanggil API untuk mendapatkan daftar karyawan
                    map((data) => {
                        return loadEmployeeSuc({ list: data })
                    }), // Jika berhasil, kirim aksi `loadEmployeeSuc`
                    catchError((err) => of(loadEmployeeFail({ errMsg: err.message }))) // Jika gagal, kirim aksi `loadEmployeeFail`
                )
            })
        )
    )

    // delete
    _deleteEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee), // Menunggu aksi `deleteEmployeeSuc`
            switchMap((action) => {
                return this.service.Delete(action.empId).pipe( // Mengapus data keryawan
                    switchMap((data) => {
                        return of(deleteEmployeeSuc({ empId: action.empId }), // Mengirim aksi `deleteEmployeeSuc` dengan `empId` yang dihapus
                            this.showAlert('Deleted Successfully.', 'pass')
                        )
                    }), // Jika berhasil, kirim aksi `deleteEmployeeSuc`
                    catchError((err) => of(this.showAlert(err.message, 'fail'))) // Jika gagal, tampilkan alert
                )
            })
        )
    )

    // add 
    _addEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployee), // Menunggu aksi `addEmployee`
            switchMap((action) => {
                return this.service.Create(action.data).pipe( // Menambah data keryawan
                    switchMap((data) => {
                        return of(addEmployeeSuc({ data: action.data }), // Mengirim aksi `addEmployeeSec` dengan `data`
                            this.showAlert('Created Successfully.', 'pass')
                        )
                    }), // Jika berhasil, kirim aksi `addEmployeeSuc`
                    catchError((err) => of(this.showAlert(err.message, 'fail'))) // Jika gagal, tampilkan alert
                )
            })
        )
    )

    // update
    _updateEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployee), // Menunggu aksi `updateEmployee`
            switchMap((action) => {
                return this.service.Update(action.data).pipe( // Menambah data keryawan
                    switchMap((data) => {
                        return of(updateEmployeeSuc({ data: action.data }), // Mengirim aksi `updateEmployeeSuc` dengan `data`
                            this.showAlert('Updated Successfully.', 'pass')
                        )
                    }), // Jika berhasil, kirim aksi `updateEmployeeSuc`
                    catchError((err) => of(this.showAlert(err.message, 'fail'))) // Jika gagal, tampilkan alert
                )
            })
        )
    )

    // menampilkan alert
    showAlert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message);
        } else {
            this.toastr.error(message);
        }
        return emptyAction();
    }
}
