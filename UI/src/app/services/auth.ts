import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:5295/api/auth';

    register(data: any): Observable<any> {
        return this.http.post(`$(this.apiUrl)/register`, data);
    }

    login(data: any): Observable<any> {
        return this.http.post(`$(this.apiUrl)/login`, data);
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}