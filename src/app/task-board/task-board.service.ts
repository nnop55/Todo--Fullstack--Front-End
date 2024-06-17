import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addTask(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/task/add`, payload)
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/task/`)
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/task/${id}`)
  }

  editTask(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/task/edit/${id}`, payload)
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/task/delete/${id}`)
  }
}
