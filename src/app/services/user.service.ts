import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) {}

// GET all users (pagination + search + filters)
getUsers(

  page = 1,

  limit = 5,

  search = '',

  role = 'All',

  status = 'All'

) {

  return this.http.get(

    `${this.api}?page=${page}&limit=${limit}&search=${search}&role=${role}&status=${status}`

  );

}

  // GET single user
  getUser(id: string) {

    return this.http.get(

      `${this.api}/${id}`

    );

  }

  // CREATE user (HR only)
  createUser(data: any) {

    return this.http.post(

      this.api,
      data

    );

  }

  // UPDATE user
  updateUser(id: string, data: any) {

    return this.http.put(

      `${this.api}/${id}`,
      data

    );

  }

  // DELETE user (HR only)
  deleteUser(id: string) {

    return this.http.delete(

      `${this.api}/${id}`

    );

  }

  getEmployees() {

  return this.http.get(

    `${this.api}/employees`

  );

}

}