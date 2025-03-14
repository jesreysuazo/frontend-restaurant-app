import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../config';
import { JwtService } from './jwt.service';
import { User, Credentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}/auth`;
  private openModal = new Subject<void>();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.jwtService.isAuthenticated());
  private isAdminSubject = new BehaviorSubject<boolean>(this.jwtService.isAdmin());
  private isCustomerSubject = new BehaviorSubject<boolean>(this.jwtService.isCustomer());
  event$ = this.openModal.asObservable();
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.jwtService.saveToken(response.token);
          this.updateAuthStates(); 
        }
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, {email});
  }
  resetPassword(payload: {"newPassword": string}, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password?token=${token}`, payload);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  verifyUser(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify?token=${token}`);
  }

  logout(): void {
    this.jwtService.removeToken();
    this.updateAuthStates();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  isCustomer(): Observable<boolean> {
    return this.isCustomerSubject.asObservable();
  }



  openAuth(){
    this.openModal.next();
  }

  private updateAuthStates(): void {
    const isAuthenticated = this.jwtService.isAuthenticated();
    this.isLoggedInSubject.next(isAuthenticated);
    this.isAdminSubject.next(isAuthenticated && this.jwtService.isAdmin());
    this.isCustomerSubject.next(isAuthenticated && this.jwtService.isCustomer());
  }
}
