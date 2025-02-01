import { inject, Injectable } from "@angular/core";
import { EmployeeService } from "../service/employee.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { deleteEmployee, deleteEmployeeSuc, emptyAction, loadEmployee, loadEmployeeFail, loadEmployeeSuc } from "./EmployeeAction";
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
