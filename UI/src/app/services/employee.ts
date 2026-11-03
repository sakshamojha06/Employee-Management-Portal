import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  bio: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5295/api/employee';

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => {
        const values = Array.isArray(response)
          ? response
          : response && typeof response === 'object'
            ? Object.values(response as Record<string, unknown>)
            : [];

        return values
          .filter((value): value is Record<string, unknown> =>
            !!value && typeof value === 'object')
          .map((value) => ({
            id: Number(value['id'] ?? value['Id']),
            name: String(value['name'] ?? value['Name'] ?? ''),
            bio: String(value['bio'] ?? value['Bio'] ?? '')
          }));
      })
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}