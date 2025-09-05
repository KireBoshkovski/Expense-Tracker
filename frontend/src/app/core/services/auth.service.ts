import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    config = inject(ConfigService);

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.config.apiAuth}/login`, {
                email,
                password,
            })
            .pipe(
                tap((tokens) => {
                    this.setTokens(tokens);
                })
            );
    }

    private setTokens(tokens: LoginResponse) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    refreshToken(): Observable<{ accessToken: string }> {
        return this.http
            .post<{ accessToken: string }>(
                `${this.config.apiAuth}/refresh-token`,
                {
                    refreshToken: this.getRefreshToken(),
                }
            )
            .pipe(
                tap((res) => {
                    localStorage.setItem('accessToken', res.accessToken);
                })
            );
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    register(
        username: string,
        email: string,
        password: string
    ): Observable<any> {
        return this.http.post(`${this.config.apiAuth}/register`, {
            username,
            email,
            password,
        });
    }
}
