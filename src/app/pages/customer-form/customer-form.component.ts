import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent
  implements OnInit, OnChanges  {

  customerForm!: FormGroup;

  customerId: string | null = null;
  @Input()
  customer: any = null;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  saved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
     private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.customerForm =
      this.fb.group({

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

        age: [
          '',
          Validators.required
        ],

        city: [
          '',
          Validators.required
        ]

      });

    this.customerId =
      this.route.snapshot.paramMap.get('id');
      if (this.customer) {

    this.customerForm.patchValue({

      name: this.customer.name,
      email: this.customer.email,
      age: this.customer.age,
      city: this.customer.city

    });

  }
  }

ngOnChanges(changes: SimpleChanges): void {
  // if (!this.customerForm) {
  //   return;
  // }

  // if (changes['customer']) {

  //   if (this.customer) {

  //     this.setFormValues();

  //   } else {

  //     this.customerForm.reset();

  //   }

  // }

}

setFormValues() {
  this.customerForm.patchValue({

    name: this.customer.name,
    email: this.customer.email,
    age: this.customer.age,
    city: this.customer.city

  });

}

  loadCustomer() {

    this.customerService
      .getCustomer(this.customerId!)
      .subscribe((customer: any) => {

        this.customerForm.patchValue(
          customer
        );

      });

  }

saveCustomer() {

  if (this.customerForm.invalid) {

    this.customerForm.markAllAsTouched();

    return;

  }

  const request = this.customer
    ? this.customerService.updateCustomer(
        this.customer._id,
        this.customerForm.value
      )
    : this.customerService.createCustomer(
        this.customerForm.value
      );

  request.subscribe({

    next: () => {

      this.saved.emit();

      this.close.emit();

    },

    error: (err) => {

        if (err.status === 400) {

    this.toastr.error(
      err.error.message,
      'Error'
    );

    return;
  }

  this.toastr.error(
    'Something went wrong',
    'Error'
  );

    }

  });

}
    cancel() {

    this.close.emit();

  }
}