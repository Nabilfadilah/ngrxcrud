import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  title = 'Add Employee' // Default title untuk mode tambah
  dialogData: any // Menyimpan data yang diterima dari dialog
  isEdit = false // Menandakan apakah dalam mode edit atau tidak

  constructor(
    private service: EmployeeService, // Service untuk komunikasi dengan backend
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService, // Data yang diterima dari popup dialog
    @Inject(MAT_DIALOG_DATA) public data: any // Toastr untuk menampilkan notifikasi sukses/gagal
  ) { }

  ngOnInit(): void {
    this.dialogData = this.data // Menyimpan data dari dialog ke variabel lokal

    // Cek apakah data ID lebih dari 0, artinya mode edit
    if (this.dialogData.code > 0) {
      this.title = 'Edit Employee' // Ubah judul menjadi "Edit Employee"
      this.isEdit = true // Set mode edit menjadi true

      // Ambil data karyawan dari server berdasarkan ID
      this.service.Get(this.dialogData.code).subscribe(item => {
        let _data = item;
        if (_data != null) {
          // Jika data ditemukan, isi form dengan data tersebut
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary
          })
        }
      })
    }
  }

  // FormGroup untuk form input karyawan
  empForm = new FormGroup({
    id: new FormControl(0),  // ID karyawan (default 0 untuk mode tambah)
    name: new FormControl('', Validators.required),  // Nama karyawan (wajib diisi)
    doj: new FormControl(new Date(), Validators.required),  // Tanggal bergabung (default: hari ini)
    role: new FormControl('', Validators.required),  // Role karyawan (wajib diisi)
    salary: new FormControl(0, Validators.required),  // Gaji karyawan (wajib diisi)
  })

  // Method untuk menyimpan data karyawan
  saveEmployee() {
    if (this.empForm.valid) { // Cek apakah form valid
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number
      }

      if (this.isEdit) {
        // Jika mode edit, panggil service update data karyawan
        this.service.Update(_data).subscribe(item => {
          this.toastr.success('Saved successfully', 'Updated') // Notifikasi sukses
          this.closePopup(); // Tutup dialog popup setelah update berhasil
        });
      } else {
        // Jika mode tambah, panggil service buat data karyawan baru
        this.service.Create(_data).subscribe(item => {
          // alert('saved NGAB...');
          this.toastr.success('Saved successfully', 'Created')  // Notifikasi sukses
          this.closePopup(); // Tutup dialog popup setelah tambah berhasil
        });
      }
    }
  }

  // method close popup
  closePopup() {
    this.ref.close();
  }

}
