import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employeeId!: number;

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    bio: ['', [Validators.required, Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          bio: employee.bio
        });
      },
      error: (error) => {
        console.error(error);
        alert('Unable to load employee details.');
        this.router.navigate(['/employees']);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.updateEmployee(
      this.employeeId,
      this.employeeForm.value
    ).subscribe({
      next: () => {
        this.notificationService.show('Employee updated successfully!', 'success');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error(error);
        alert('Unable to update employee.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
