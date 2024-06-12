import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/api/login`, payload)
      .pipe(tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  register(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/api/register`, payload);
  }

  logout() {
    return this.http.post<any>(`${this.baseUrl}/api/logout`, {})
      .pipe(tap(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }));
  }
}
