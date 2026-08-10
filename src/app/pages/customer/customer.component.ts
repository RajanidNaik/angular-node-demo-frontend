import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/internal/Subject';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CustomerFormComponent,
    ConfirmationModalComponent,
    FormsModule
  ],
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  customers: any[] = [];

  page = 1;

  totalPages = 0;
  showModal = false;
  selectedCustomer: any = null;
  showDeleteModal = false;

selectedCustomerId = '';
search = '';
private searchSubject!: Subject<string>;

  constructor(
    private customerService: CustomerService,
    private searchService: SearchService
  ) {}

ngOnInit() {

  this.searchSubject =

    this.searchService.createDebounce(() => {

      this.page = 1;

      this.loadCustomers();

    });

  this.loadCustomers();

}
onSearch() {

  this.searchSubject.next(this.search);

}

  loadCustomers() {

    this.customerService
      .getCustomers(this.page, 5, this.search)
      .subscribe((res: any) => {

        this.customers =
          res.customers;

        this.totalPages =
          res.totalPages;

      });

  }
  clearSearch() {

  this.search = '';

  this.page = 1;

  this.loadCustomers();

}
    openAddModal() {

    this.selectedCustomer = null;

    this.showModal = true;

  }
    openEditModal(customer: any) {

    this.selectedCustomer = customer;

    this.showModal = true;

  }
    closeModal() {

    this.showModal = false;

  }
    customerSaved() {

    this.closeModal();

    this.loadCustomers();

  }

  nextPage() {

    if (
      this.page < this.totalPages
    ) {

      this.page++;

      this.loadCustomers();

    }

  }

  prevPage() {

    if (this.page > 1) {

      this.page--;

      this.loadCustomers();

    }

  }

  deleteCustomer() {

    // const confirmDelete =
    //   confirm(
    //     'Delete Customer?'
    //   );

    // if (!confirmDelete) {
    //   return;
    // }

    this.customerService
      .deleteCustomer(this.selectedCustomerId)
      .subscribe(() => {
this.showDeleteModal = false;
        this.loadCustomers();

      });

  }
  openDeleteModal(id: string) {

  this.selectedCustomerId = id;

  this.showDeleteModal = true;

}
closeDeleteModal() {

  this.showDeleteModal = false;

}

}