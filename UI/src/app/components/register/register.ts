import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {

  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  message = '';
  errorMessage = '';

  register(): void {

    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.message = 'Registration successful! Please login.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Registration failed.';
      }
    });
  }
}