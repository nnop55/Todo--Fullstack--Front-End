import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IApi, LoginRequest, LoginResponse, RefreshTokenResponse, RegisterRequest, ResponseStatus } from '../../shared/utils/unions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly accessTokenKey = 'TDTM-Access-Token'
  static readonly refreshTokenKey = 'TDTM-Refresh-Token'

  private baseUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem(AuthService.accessTokenKey) ?? null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  updateUserSubject(value: string | null) {
    this.currentUserSubject.next(value)
  }

  login(payload: LoginRequest): Observable<IApi<LoginResponse>> {
    return this.http.post<IApi<LoginResponse>>(`${this.baseUrl}/api/auth/login`, payload)
      .pipe(tap(response => {
        if (response.code === ResponseStatus.Success) {
          localStorage.setItem(AuthService.accessTokenKey, response.data.accessToken);
          localStorage.setItem(AuthService.refreshTokenKey, response.data.refreshToken);
          this.currentUserSubject.next(response.data.accessToken)
        }
      }));
  }

  register(payload: RegisterRequest): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/register`, payload);
  }

  refreshToken(): Observable<IApi<RefreshTokenResponse>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(AuthService.refreshTokenKey)}`
    })

    return this.http.post<IApi<RefreshTokenResponse>>(
      `${this.baseUrl}/api/auth/refresh-token`,
      {},
      { headers }
    );
  }

  logout(): Observable<IApi<{}>> {
    return this.http.post<IApi<{}>>(`${this.baseUrl}/api/auth/logout`, {})
      .pipe(tap(() => {
        localStorage.removeItem(AuthService.accessTokenKey);
        localStorage.removeItem(AuthService.refreshTokenKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
        window.location.reload()
      }));
  }
}
