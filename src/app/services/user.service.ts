import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL: string = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}register/`, userData);
  }
}
