import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  login(): void {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveUser(response.user);

        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Invalid email or password.';
      }
    });
  }
}