import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../servive/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm: FormGroup

  education: string[] = [
    'O-Level',
    'A-Level',
    'Graduation',
    'Post-Graduation',
    'Masters',
    'Phd'
  ]

  constructor(
    private formBuilde: FormBuilder,
    private employeeService: EmployeeService,
    private coreService: CoreService,
    private matDialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.formBuilde.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      organization: '',
      experience: '',
      salary: ''
    })
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        debugger
        this.employeeService.updateEmployee(this.data.id, this.employeeForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee data updated!')
            this.matDialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee added sucessfully!')
            this.matDialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
