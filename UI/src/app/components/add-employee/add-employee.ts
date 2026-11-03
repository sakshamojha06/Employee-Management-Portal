import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  router = inject(Router);

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    bio: ['', [Validators.required, Validators.maxLength(500)]]
  });

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error(error);
        alert('Unable to add employee.');
      }
    });
  }
}