import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  addEmployee(data: any) {
    return this.httpClient.post('http://localhost:3000/employees', data)
  }

  updateEmployee(id: number, data: any) {
    return this.httpClient.put(`http://localhost:3000/employees/${id}`, data)
  }

  getEmployeeList() {
    return this.httpClient.get('http://localhost:3000/employees')
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(`http://localhost:3000/employees/${id}`)
  }
}
