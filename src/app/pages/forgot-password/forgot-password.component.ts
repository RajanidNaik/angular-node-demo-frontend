import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ ReactiveFormsModule,
    RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.forgotForm = this.fb.group({

      email: [

        '',

        [

          Validators.required,

          Validators.email

        ]

      ]

    });

  }
sendResetLink() {

  if (

    this.forgotForm.invalid

  ) {

    return;

  }

  this.authService

    .forgotPassword(

      this.forgotForm.value.email

    )

    .subscribe({

      next: (res: any) => {

        this.router.navigate(

          ['/reset-password'],

          {

            queryParams: {

              token: res.token

            }

          }

        );

      },

      error: (err) => {

        alert(

          err.error.message

        );

      }

    });

}
}
