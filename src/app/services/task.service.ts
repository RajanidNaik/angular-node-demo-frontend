import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = environment.apiUrl + '/tasks';

  constructor(
    private http: HttpClient
  ) { }

  // GET all tasks (pagination)
getTasks(

  page = 1,

  limit = 5,

  search = '',

  priority = '',

  status = '',

  assignedTo = ''

) {

  return this.http.get(

    `${this.api}?page=${page}&limit=${limit}&search=${search}&priority=${priority}&status=${status}&assignedTo=${assignedTo}`

  );

}

  // GET task by id
  getTask(id: string) {

    return this.http.get(

      `${this.api}/${id}`

    );

  }

  // CREATE task
  createTask(task: Task) {

    return this.http.post(

      this.api,
      task

    );

  }

  // UPDATE task
// UPDATE task
updateTask(
  id: string,
  task: Partial<Task>
) {

  return this.http.put(

    `${this.api}/${id}`,

    task

  );

}

  // DELETE task
  deleteTask(id: string) {

    return this.http.delete(

      `${this.api}/${id}`

    );

  }

}