import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = environment.apiUrl;
 private userSubject = new BehaviorSubject<any>(
  JSON.parse(localStorage.getItem('user') || 'null')
);

user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }

    login(data: any) {

    return this.http.post(
      `${this.apiUrl}/auth/login`,
      data
    );

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  register(data: any) {

  return this.http.post(
    `${this.apiUrl}/auth/register`,
    data
  );

}
forgotPassword(email: string) {

  return this.http.post(

    `${this.apiUrl}/auth/forgot-password`,

    {

      email

    }

  );

}

resetPassword(data: any) {

  return this.http.post(

    `${this.apiUrl}/auth/reset-password`,

    data

  );

}
getCurrentUsers() {

  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;

}

getRole() {

  return this.getCurrentUsers()?.role;

}

isHR() {

  return this.getRole() === 'HR';

}

isManager() {

  return this.getRole() === 'Manager';

}

isEmployee() {

  return this.getRole() === 'Employee';

}

logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');
  this.userSubject.next(null);

}

setUser(user: any) {

  localStorage.setItem(

    'user',

    JSON.stringify(user)

  );

  this.userSubject.next(user);

}

getCurrentUser() {

  return this.userSubject.value;

}
}
