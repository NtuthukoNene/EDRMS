import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'edrms_token';
    private readonly USER_KEY = 'edrms_user';

    currentUser$ = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());

    constructor(private http: HttpClient, private router: Router) {}

    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data).pipe(
            tap(response => this.storeSession(response))
        );
    }

    login(data: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, data).pipe(
            tap(response => this.storeSession(response))
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUser$.next(null);
        this.router.navigate(['/auth/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private storeSession(response: AuthResponse): void {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
        this.currentUser$.next(response);
    }

    private getStoredUser(): AuthResponse | null {
        const user = localStorage.getItem(this.USER_KEY);
        return user ? JSON.parse(user) : null;
    }
}