import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  employees: Employee[] = [];
  isAdmin = false;
  errorMessage = '';

  ngOnInit(): void {
    this.isAdmin = this.authService.getRole() === 'Admin';
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = [...response];
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load employees.';
      }
    });
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },
      error: () => {
        this.errorMessage = 'Unable to delete employee.';
      }
    });
  }
}