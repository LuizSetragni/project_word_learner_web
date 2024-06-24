import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL: string = "http://3.134.211.144/api/";

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}register/`, userData);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/token/`, credentials);
  }
}
