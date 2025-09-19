import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { environment } from '../environments/environment';

interface LoginResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<{ username: string } | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeJwt(token);
      this.user.set({ username: payload.sub });
    }
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(environment.apiUrl+'/auth/login', { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.jwt);
        const payload = this.decodeJwt(res.jwt);
        this.user.set({ username: payload.sub });
      }),
      map(() => void 0)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
  }

  isAuthenticated() {
    return this.user() !== null;
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return {};
    }
  }
}
