import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL: string = "http://3.134.211.144/api/";

  constructor(private httpClient: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.httpClient.post(`${this.API_URL}token/`, credentials);
  }
}









