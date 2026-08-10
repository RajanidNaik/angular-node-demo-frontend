import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private api = environment.apiUrl + '/customers';
  constructor(private http: HttpClient) { }


getCustomers(

  page = 1,

  limit = 5,

  search = ''

) {

  return this.http.get(

    `${this.api}?page=${page}&limit=${limit}&search=${search}`

  );

}

getCustomer(id: string) {

  return this.http.get(
    `${this.api}/${id}`
  );

}

createCustomer(data: any) {

  return this.http.post(
    this.api,
    data
  );

}

updateCustomer(
  id: string,
  data: any
) {

  return this.http.put(
    `${this.api}/${id}`,
    data
  );

}

deleteCustomer(id: string) {

  return this.http.delete(
    `${this.api}/${id}`
  );

}
}
