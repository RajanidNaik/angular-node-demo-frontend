import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  role = 'Employee';   // ⭐ default role

  department = '';
  designation = '';
  phone = '';
  managerId = '';

  adminKey = '';       // ⭐ for HR creation

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const payload: any = {

      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      department: this.department,
      designation: this.designation,
      phone: this.phone,
      managerId: this.managerId

    };

    // ⭐ only send adminKey if HR selected
    if (this.role === 'HR') {
      payload.adminKey = this.adminKey;
    }

    this.authService
      .register(payload)
      .subscribe({

        next: () => {

          alert('Registration Successful');

          this.router.navigate(['/login']);

        },

        error: (err) => {

          alert(
            err.error.message || 'Registration Failed'
          );

        }

      });
  }

}