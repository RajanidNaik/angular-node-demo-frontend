import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent
implements OnInit {

  profileForm!: FormGroup;

  passwordForm!: FormGroup;
  selectedFile: File | null = null;

profileImageUrl = 'assets/avatar.png';

  constructor(

    private fb: FormBuilder,

    private profileService: ProfileService,

    private toastr: ToastrService,
    private authService: AuthService

  ) {}

  ngOnInit() {

    this.profileForm =
      this.fb.group({

        name: ['', Validators.required],

        email: [{ value: '', disabled: true }],

        role: [{ value: '', disabled: true }],

        department: [''],

        designation: [''],

        phone: [''],
         profileImage: [null]

      });

    this.passwordForm =
      this.fb.group({

        currentPassword: [

          '',

          Validators.required

        ],

        newPassword: [

          '',

          Validators.required

        ],

      });

    this.loadProfile();

  }

  loadProfile() {

    this.profileService
      .getProfile()
.subscribe((user: any) => {

  this.profileForm.patchValue({

    name: user.name,

    email: user.email,

    role: user.role,

    department: user.department,

    designation: user.designation,

    phone: user.phone

  });

  if (user.profileImage) {

    this.profileImageUrl =
      `${environment.backendUrl}/uploads/profile/${user.profileImage}`;

  }

});

  }

updateProfile() {

  const formData = new FormData();

  formData.append(
    'name',
    this.profileForm.get('name')?.value
  );

  formData.append(
    'department',
    this.profileForm.get('department')?.value
  );

  formData.append(
    'designation',
    this.profileForm.get('designation')?.value
  );

  formData.append(
    'phone',
    this.profileForm.get('phone')?.value
  );

  if (this.selectedFile) {

    formData.append(
      'profile',
      this.selectedFile
    );

  }

  this.profileService
    .updateProfile(formData)
    .subscribe((res: any) => {

      this.authService.setUser(res.user);

      this.toastr.success(
        'Profile updated successfully'
      );

    });

}

  changePassword() {

    if (this.passwordForm.invalid) {

      return;

    }

    this.profileService
      .changePassword(
        this.passwordForm.value
      )
      .subscribe({

        next: () => {

          this.toastr.success(

            'Password changed successfully'

          );

          this.passwordForm.reset();

        },

        error: (err) => {

          this.toastr.error(

            err.error.message

          );

        }

      });

  }
onFileSelected(event: any) {

  const file = event.target.files[0];

  if (!file) return;

  this.selectedFile = file;

  const reader = new FileReader();

  reader.onload = () => {

    this.profileImageUrl = reader.result as string;

  };

  reader.readAsDataURL(file);

}
}