import { inject, Injectable } from "@angular/core";
import { EmployeeService } from "../service/employee.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadEmployee, loadEmployeeFail, loadEmployeeSuc } from "./EmployeeAction";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class empEffect {

    actions$ = inject(Actions); // Observable yang berisi aksi-aksi yang terjadi di store
    service = inject(EmployeeService); // Service untuk memanggil API

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
}
