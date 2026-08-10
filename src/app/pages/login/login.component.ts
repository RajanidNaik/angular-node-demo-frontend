import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login({

      email: this.email,
      password: this.password

    }).subscribe({

      next: (res: any) => {

        
        localStorage.setItem('token', res.token);

       
        this.authService.setUser(

  res.user

);

        
        const role = res.user.role;

        if (role === 'HR') {

          this.router.navigate(['/dashboard']);

        } else if (role === 'Manager') {

          this.router.navigate(['/dashboard']);

        } else {

          this.router.navigate(['/dashboard']);

        }

      },

      error: () => {

        alert('Invalid credentials');

      }

    });

  }

}