import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeService } from './servive/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'organization',
    'experience',
    'salary',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }


  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  addEditEmployee() {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
    })
  }

  openEditEmplyeeForm(data: any) {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, { data })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
    })
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Record delete')
        this.getEmployeeList()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
