import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  SERVER_URL = 'http://localhost:3000';
  TOKEN = `Bearer ` + JSON.parse(this.localStorage.getItem('token'));
  HEADERS = new HttpHeaders().set('Authorization', this.TOKEN);

  constructor(private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage) { }


  // return this.httpClient.get(this.baseURL + 'users/' + userName + '/repos', { 'headers': headers })

  public getQuestions(query?: string) {
    if (query) {
      return this.http.get(`${this.SERVER_URL}/question${query}`, { 'headers': this.HEADERS })
    } else {
      return this.http.get(`${this.SERVER_URL}/question`, { 'headers': this.HEADERS })
    }
  }
}
