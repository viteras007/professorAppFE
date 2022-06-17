import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  SERVER_URL = 'http://localhost:3000';
  TOKEN = `Bearer ` + JSON.parse(this.localStorage.getItem('currentUser'));

  constructor(private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage) { }

  public getQuestions() {
    return this.http.get(`${this.SERVER_URL}/question`)
  }
}
