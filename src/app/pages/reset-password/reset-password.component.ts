import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [    CommonModule,

    ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;

  token = '';

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private authService: AuthService

  ) {}
    ngOnInit(): void {

    this.token =

      this.route.snapshot.queryParamMap.get(

        'token'

      ) || '';

    this.resetForm =

      this.fb.group({

        password: [

          '',

          [

            Validators.required,

            Validators.minLength(6)
                      ]

        ],

        confirmPassword: [

          '',

          Validators.required

        ]

      });

  }
    resetPassword() {

    if (

      this.resetForm.invalid

    ) {

      return;

    }

    if (

      this.resetForm.value.password !==

      this.resetForm.value.confirmPassword

    ) {

      alert(

        'Passwords do not match'

      );
            return;

    }

    this.authService

      .resetPassword({

        token: this.token,

        password:

          this.resetForm.value.password

      })

      .subscribe({

        next: () => {

          alert(
                        'Password Updated Successfully'

          );

          this.router.navigate([

            '/login'

          ]);

        },

        error: (err) => {

          alert(

            err.error.message

          );

        }

      });

  }
}
