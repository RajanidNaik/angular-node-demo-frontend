import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent
  implements OnInit, OnChanges {

  form!: FormGroup;

  @Input()
  user: any = null;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  saved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      role: [
        'Employee',
        Validators.required
      ],

      department: [''],

      designation: [''],

      phone: [''],

      status: [
        'Active',
        Validators.required
      ]

    });

    if (this.user) {

      this.setFormValues();

    }

  }

  ngOnChanges(changes: SimpleChanges) {

    if (
      this.form &&
      changes['user']
    ) {

      if (this.user) {

        this.setFormValues();

      } else {

        this.form.reset({

          role: 'Employee',

          status: 'Active'

        });

      }

    }

  }

  setFormValues() {

    this.form.patchValue({

      name: this.user.name,

      email: this.user.email,

      role: this.user.role,

      department: this.user.department,

      designation: this.user.designation,

      phone: this.user.phone,

      status: this.user.status

    });

  }

  save() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const request = this.user
      ? this.userService.updateUser(
          this.user._id,
          this.form.value
        )
      : this.userService.createUser(
          this.form.value
        );

    request.subscribe({

      next: () => {

        this.toastr.success(

          this.user
            ? 'User updated successfully'
            : 'User created successfully'

        );

        this.saved.emit();

        this.close.emit();

      },

      error: (err) => {

        this.toastr.error(

          err.error?.message ||
          'Something went wrong'

        );

      }

    });

  }

  cancel() {

    this.close.emit();

  }

}