import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WeekCountInterface } from '../../interfaces/weekCount.interface';
import { WordListInterface } from '../../interfaces/wordList.interface';
import { wordInterface } from '../../interfaces/word.interface';
import { LinkInterface } from '../../interfaces/link.interface';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private API_URL: string = "http://127.0.0.1:8000/api";

  constructor(private httpClient: HttpClient) { }

  getWordCountLastWeek(userId: number): Observable<WeekCountInterface> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/words/count/last_week/${userId}/`;

    return this.httpClient.get<WeekCountInterface>(url, { headers });
  }

  getWordList(userId: number): Observable<WordListInterface[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/words/contents/${userId}/`;

    return this.httpClient.get<{word_list: WordListInterface[]}>(url, { headers }).pipe(map(x => x.word_list));
  }

  getWordContent(wordId: number): Observable<wordInterface> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/word/detail/${wordId}/`;

    return this.httpClient.get<wordInterface>(url, { headers });
  }

  getLinkList(userId: number): Observable<LinkInterface[]>{
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/words/links/${userId}/`;

    return this.httpClient.get<LinkInterface[]>(url, {headers});
  }
}
