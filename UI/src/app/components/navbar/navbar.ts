import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.getUser();

  isAdmin = this.authService.getRole() === 'Admin';

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
