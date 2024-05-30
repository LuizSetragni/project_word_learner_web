import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeekCountInterface } from '../../interfaces/weekCount.interface';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private API_URL: string = "http://127.0.0.1:8000/api";

  constructor(private httpClient: HttpClient) { }

  getWordCountLastWeek(userId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/words/count/last_week/${userId}/`;

    return this.httpClient.get<WeekCountInterface>(url, { headers });
  }
}
