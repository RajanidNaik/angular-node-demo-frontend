import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private api = environment.apiUrl + '/profile';

  constructor(
    private http: HttpClient
  ) {}

  // Get logged-in user's profile
  getProfile() {

    return this.http.get(

      this.api

    );

  }

  // Update profile
updateProfile(data: FormData) {

  return this.http.put(

    `${this.api}`,

    data

  );

}

  // Change password
  changePassword(data: any) {

    return this.http.put(

      `${this.api}/change-password`,

      data

    );

  }
  uploadProfile(file: File) {

  const formData = new FormData();

  formData.append(

    'profile',

    file

  );

  return this.http.post(

    `${this.api}/upload-profile`,

    formData

  );

}

}