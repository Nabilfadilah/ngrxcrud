import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  constructor(private dialog: MatDialog, private service: EmployeeService) {

  }

  ngOnInit(): void {
    this.GetallEmployee();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetallEmployee() {
    let sub = this.service.GetAll().subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    })
    this.subscription.add(sub);
  }

  addemployee() {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms'
    }).afterClosed().subscribe(o => {
      this.GetallEmployee();
    })
  }

  // method delete 
  DeleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let sub = this.service.Delete(empId).subscribe(item => {
        this.GetallEmployee();
      })
      this.subscription.add(sub);
    }
  }


}
