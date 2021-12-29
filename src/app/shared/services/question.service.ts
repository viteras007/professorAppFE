import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/questions/';

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  create(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  update(payload: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + payload.id, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + id);
  }

}
