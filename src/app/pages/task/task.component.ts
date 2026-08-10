import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TaskFormComponent,
    ConfirmationModalComponent,
    FormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  tasks: any[] = [];

  page = 1;

  totalPages = 0;

  showModal = false;

  selectedTask: any = null;

  showDeleteModal = false;

  selectedTaskId = '';
  currentUser: any;

isHR = false;

isManager = false;

isEmployee = false;
search = '';

selectedPriority = 'All';

selectedStatus = 'All';

selectedEmployee = 'All';

employees: any[] = [];
private searchSubject!: Subject<string>;

  constructor(
    private taskService: TaskService,
     private userService: UserService,
      private searchService: SearchService
  ) {}

  ngOnInit() {

    this.currentUser = JSON.parse(

  localStorage.getItem('user') || '{}'

);

this.isHR =
  this.currentUser.role === 'HR';

this.isManager =
  this.currentUser.role === 'Manager';

this.isEmployee =
  this.currentUser.role === 'Employee';

this.searchSubject=

this.searchService.createDebounce(()=>{

this.page=1;

this.loadTasks();

});
if (!this.isEmployee) {

  this.loadEmployees();

}

this.loadTasks();

  }
  onSearch() {

  this.searchSubject.next(this.search);

}

loadTasks() {

  this.taskService

    .getTasks(

      this.page,

      5,

      this.search,

      this.selectedPriority,

      this.selectedStatus,

      this.selectedEmployee

    )

    .subscribe((res: any) => {

      this.tasks = res.tasks;

      this.totalPages = res.totalPages;

    });

}
  loadEmployees() {

  this.userService

    .getEmployees()

    .subscribe((res: any) => {

      this.employees = res;

    });

}
searchTasks() {

  this.page = 1;

  this.loadTasks();

}
clearFilters() {

  this.search = '';

  this.selectedPriority = 'All';

  this.selectedStatus = 'All';

  this.selectedEmployee = 'All';

  this.page = 1;

  this.loadTasks();

}

  openAddModal() {

    this.selectedTask = null;

    this.showModal = true;

  }

  openEditModal(task: any) {

    this.selectedTask = task;

    this.showModal = true;

  }

  closeModal() {

    this.showModal = false;

  }

  taskSaved() {

    this.closeModal();

    this.loadTasks();

  }

  nextPage() {

    if (this.page < this.totalPages) {

      this.page++;

      this.loadTasks();

    }

  }

  prevPage() {

    if (this.page > 1) {

      this.page--;

      this.loadTasks();

    }

  }

  deleteTask() {

    this.taskService
      .deleteTask(this.selectedTaskId)
      .subscribe(() => {

        this.showDeleteModal = false;

        this.loadTasks();

      });

  }

  openDeleteModal(id: string) {

    this.selectedTaskId = id;

    this.showDeleteModal = true;

  }

  closeDeleteModal() {

    this.showDeleteModal = false;

  }
  updateStatus(task: any) {

  this.taskService

    .updateTask(

      task._id,

      {

        status: task.status

      }

    )

    .subscribe();

}

}