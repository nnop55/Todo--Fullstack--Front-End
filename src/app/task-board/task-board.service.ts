import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskBody, IApi, TaskItem, DeleteTaskResponse } from '../shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addTask(payload: TaskBody): Observable<IApi<TaskBody>> {
    return this.http.post<IApi<TaskBody>>(`${this.baseUrl}/api/task/add`, payload)
  }

  getTasks(): Observable<IApi<TaskItem[]>> {
    return this.http.get<IApi<TaskItem[]>>(`${this.baseUrl}/api/task/`)
  }

  getTaskById(id: number): Observable<IApi<TaskItem>> {
    return this.http.get<IApi<TaskItem>>(`${this.baseUrl}/api/task/${id}`)
  }

  editTask(id: number, payload: TaskBody): Observable<IApi<TaskBody>> {
    return this.http.put<IApi<TaskBody>>(`${this.baseUrl}/api/task/edit/${id}`, payload)
  }

  deleteTask(id: number): Observable<IApi<DeleteTaskResponse>> {
    return this.http.delete<IApi<DeleteTaskResponse>>(`${this.baseUrl}/api/task/delete/${id}`)
  }
}
