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

import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent
  implements OnInit, OnChanges {

  taskForm!: FormGroup;

  taskId: string | null = null;

  @Input()
  task: any = null;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  saved = new EventEmitter<void>();

  // ⭐ NEW: employees list
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.taskForm = this.fb.group({

      title: ['', Validators.required],

      description: [''],

      priority: [
        'Medium',
        Validators.required
      ],

      status: [
        'Pending',
        Validators.required
      ],

      assignedTo: ['', Validators.required],

      dueDate: ['', Validators.required]

    });

    this.taskId =
      this.route.snapshot.paramMap.get('id');

    // ⭐ LOAD EMPLOYEES
    this.loadEmployees();

  }

loadEmployees() {

  this.userService
    .getEmployees()
    .subscribe((res: any) => {

      this.employees = res;

      if (this.task) {

        this.setFormValues();

      }

    });

}

ngOnChanges() {

  if (

    this.task &&

    this.taskForm

  ) {

    this.setFormValues();

  }

}

  setFormValues() {

    this.taskForm.patchValue({

      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status,
      assignedTo: this.task.assignedTo?._id || this.task.assignedTo,
      dueDate:

this.task.dueDate

? this.task.dueDate.substring(0, 10)

: ''

    });

  }

  saveTask() {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }

    const request = this.task
      ? this.taskService.updateTask(
          this.task._id,
          this.taskForm.value
        )
      : this.taskService.createTask(
          this.taskForm.value
        );

    request.subscribe({

      next: () => {

        this.toastr.success(
          this.task
            ? 'Task updated successfully'
            : 'Task created successfully'
        );

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