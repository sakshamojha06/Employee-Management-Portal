import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';
import { Navbar } from '../navbar/navbar';
import { NotificationService } from '../../services/notification';

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
  private notificationService = inject(NotificationService);

  employees: Employee[] = [];
  isAdmin = false;
  errorMessage = '';
  showDeleteConfirmation = false;
  employeeToDelete?: number;

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
    this.employeeToDelete = id;
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.employeeToDelete = undefined;
  }

  confirmDelete(): void {
    if (this.employeeToDelete === undefined) {
      return;
    }

    const employeeId = this.employeeToDelete;
    this.cancelDelete();

    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.notificationService.show('Employee deleted successfully!', 'success');
        this.loadEmployees();
      },
      error: () => {
        this.errorMessage = 'Unable to delete employee.';
      }
    });
  }
}