import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  role = 'Employee';   

  department = '';
  designation = '';
  phone = '';
  managerId = '';

  adminKey = '';       

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
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

    if (this.role === 'HR') {
      payload.adminKey = this.adminKey;
    }

    this.authService
      .register(payload)
      .subscribe({

        next: () => {

          this.toastr.success('Registration Successful', 'Success');
          this.router.navigate(['/login']);

        },

        error: (err) => {
          this.toastr.error(
            err.error.message || 'Registration Failed',
            'Error'
          );

        }

      });
  }

}