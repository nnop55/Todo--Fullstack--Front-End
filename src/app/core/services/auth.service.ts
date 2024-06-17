import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseStatus } from '../../shared/utils/unions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly tokenKey = 'CURRENT-USER-TOKEN'

  private baseUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem(AuthService.tokenKey));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, payload)
      .pipe(tap(response => {
        if (response.code === ResponseStatus.Success) {
          localStorage.setItem(AuthService.tokenKey, response.data.accessToken);
          this.currentUserSubject.next(response.data)
        }
      }));
  }

  register(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`, payload);
  }

  logout() {
    return this.http.post<any>(`${this.baseUrl}/api/auth/logout`, {})
      .pipe(tap(() => {
        localStorage.removeItem(AuthService.tokenKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
        location.reload();
      }));
  }
}
