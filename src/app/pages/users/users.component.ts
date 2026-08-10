import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/internal/Subject';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    ConfirmationModalComponent,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  page = 1;

  totalPages = 0;

  showModal = false;

  selectedUser: any = null;

  showDeleteModal = false;

  selectedUserId = '';
  search = '';

selectedRole = 'All';

selectedStatus = 'All';
private searchSubject!: Subject<string>;

  constructor(
    private userService: UserService,
     private searchService: SearchService,
     private exportService: ExportService
  ) {}

ngOnInit() {

  this.searchSubject = this.searchService.createDebounce(() => {

    this.page = 1;

    this.loadUsers();

  });

  this.loadUsers();

}
  onSearch() {

  this.searchSubject.next(this.search);

}

loadUsers() {

  this.userService

    .getUsers(

      this.page,

      5,

      this.search,

      this.selectedRole,

      this.selectedStatus

    )

    .subscribe((res: any) => {

      this.users = res.users;

      this.totalPages = res.totalPages;

    });

}
searchUsers() {

  this.page = 1;

  this.loadUsers();

}

  openAddModal() {

    this.selectedUser = null;

    this.showModal = true;

  }

  openEditModal(user: any) {

    this.selectedUser = user;

    this.showModal = true;

  }

  closeModal() {

    this.showModal = false;

  }

  userSaved() {

    this.closeModal();

    this.loadUsers();

  }

  openDeleteModal(id: string) {

    this.selectedUserId = id;

    this.showDeleteModal = true;

  }

  closeDeleteModal() {

    this.showDeleteModal = false;

  }

  deleteUser() {

    this.userService
      .deleteUser(this.selectedUserId)
      .subscribe(() => {

        this.showDeleteModal = false;

        this.loadUsers();

      });

  }
  clearFilters() {

  this.search = '';

  this.selectedRole = 'All';

  this.selectedStatus = 'All';

  this.page = 1;

  this.loadUsers();

}

  nextPage() {

    if (this.page < this.totalPages) {

      this.page++;

      this.loadUsers();

    }

  }

  prevPage() {

    if (this.page > 1) {

      this.page--;

      this.loadUsers();

    }

  }
  exportUsers() {

  const data =
    this.users.map(user => ({

      Name: user.name,

      Email: user.email,

      Role: user.role,

      Status: user.status

    }));

  this.exportService.exportExcel(

    data,

    'Users'

  );

}

}