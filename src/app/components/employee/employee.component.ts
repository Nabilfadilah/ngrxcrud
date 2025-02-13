import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../store/EmployeeAction';
import { getEmpList } from '../../store/EmployeeSelector';

@Component({
  selector: 'app-employee',
  imports: [MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  empList: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'role', 'doj', 'salary', 'action']
  subscription = new Subscription();

  // constructor(private dialog: MatDialog, private service: EmployeeService) {

  // }

  constructor(private dialog: MatDialog,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.GetallEmployee();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetallEmployee() {
    // let sub = this.service.GetAll().subscribe(item => {
    //   this.empList = item;
    //   this.dataSource = new MatTableDataSource(this.empList);
    // })
    // this.subscription.add(sub);

    // hanti ama reducer
    this.store.dispatch(loadEmployee())
    this.store.select(getEmpList).subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    })
  }

  addemployee() {
    this.openPopup(0);
  }

  // method delete 
  DeleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      // let sub = this.service.Delete(empId).subscribe(item => {
      //   this.GetallEmployee();
      // })
      // this.subscription.add(sub);

      // rubah jadi format reducer
      this.store.dispatch(deleteEmployee({ empId: empId }));
    }
  }

  // Method untuk mengedit data karyawan berdasarkan ID karyawan
  EditEmployee(empId: number) {
    // Memanggil method openPopup dengan parameter empId
    this.openPopup(empId);
  }

  // Method untuk membuka popup (dialog) dengan data karyawan yang dipilih
  openPopup(empId: number) {
    // Membuka dialog Angular Material dan menampilkan komponen AddEmployeeComponent
    this.dialog.open(AddEmployeeComponent, {
      width: '50%', // Menentukan lebar popup 50% dari layar
      exitAnimationDuration: '1000ms', // Durasi animasi saat popup ditutup
      enterAnimationDuration: '1000ms', // Durasi animasi saat popup dibuka
      data: { 'code': empId } // Mengirim data empId ke komponen AddEmployeeComponent
    }).afterClosed().subscribe(o => {
      // Setelah dialog ditutup, panggil method GetallEmployee untuk merefresh data
      this.GetallEmployee();
    });
  }


}
