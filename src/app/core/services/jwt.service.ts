import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private tokenKey = 'tokenKey';

  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.roles?.[0] ?? null;
    } catch (error) {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isCustomer(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }
}
