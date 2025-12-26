import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth'; // Adjust based on your backend config

    constructor(private http: HttpClient) { }

    login(credentials: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.access_token) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                }
            })
        );
    }

    register(userData: { username: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
