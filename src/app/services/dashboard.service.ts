import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = environment.apiUrl + '/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getDashboard() {

    return this.http.get(

      this.api

    );

  }
    getSummary() {

    return this.http.get(

      `${this.api}/summary`

    );

  }

}