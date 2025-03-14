import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, Credentials } from '../../core/models/auth.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true
})
export class AuthComponent {
  @Output() closeAuthModal = new EventEmitter<boolean>();
  isLoginMode = true;
  isForgotPasswordMode = false;
  user: User = { name: '', email: '', password: '', phoneNumber: '', address: '' };
  credentials: Credentials = { email: '', password: '' };
  forgotPasswordEmail = '';
  errorMessage = '';
  isEmailValid = true;
  isLoading = false;
  successMsg = '';
isForgotEmailValid = true;

  constructor(private authService: AuthService, private router: Router) { }

  get email(): string {
    return this.isLoginMode ? this.credentials.email : this.user.email;
  }

  set email(value: string) {
    if (this.isLoginMode) {
      this.credentials.email = value;
    } else {
      this.user.email = value;
    }
  }

  get password(): string {
    return this.isLoginMode ? this.credentials.password : this.user.password;
  }

  set password(value: string) {
    if (this.isLoginMode) {
      this.credentials.password = value;
    } else {
      this.user.password = value;
    }
  }

  toggleMode(): void {
    this.errorMessage = '';
    this.isLoginMode = !this.isLoginMode;
    this.isForgotPasswordMode = false;
    this.isEmailValid = true;
  }

  toggleForgotPassword(): void {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
    this.isLoginMode = true;
    this.errorMessage = '';
  }

  validateEmail(): void {
    if (!this.email.trim()) {
      this.isEmailValid = true;
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid = emailPattern.test(this.email);
  }

  isFormValid(): boolean {
    if (this.isLoading) return true;
    if (!this.isEmailValid) return false;
    if (this.isLoginMode) {
      return this.credentials.email.trim() !== '' && this.credentials.password.trim() !== '';
    } else {
      return (
        this.user.name.trim() !== '' &&
        this.user.email.trim() !== '' &&
        this.user.password.trim() !== '' &&
        this.user.phoneNumber.trim() !== '' &&
        this.user.address.trim() !== ''
      );
    }
  }

  submit(): void {
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(this.credentials).subscribe({
        next: (res) => {
          console.log('res', res);
        },
        error: (err) => {
          console.error('Login error:', err.error);
          this.errorMessage = err.error;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.closeAuthModal.emit(false);
        }
      });
    } else {
      this.authService.register(this.user).subscribe({
        next: (res) => {
          console.log('Registration response:', res);
          this.successMsg = res.message;
          setTimeout(() => this.closeModal(), 1000);
        },
        error: (err) => {
          console.error('Register error:', err.error);
          this.errorMessage = err.error;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  submitForgotPassword(): void {
    this.isLoading = true
    console.log('Forgot Password Email:', this.forgotPasswordEmail);
    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe({
      next: (res) => {
        console.log('Registration response:', res);
        this.successMsg = res.message;
        setTimeout(() => this.closeModal(), 1000);
      },
      error: (err) => {
        console.error('Register error:', err.error.text);
        this.successMsg = err.error.text;
        setTimeout(() => this.closeModal(), 1000);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  closeModal(): void {
    this.closeAuthModal.emit(false);
  }

  validateForgotPasswordEmail(): void {
    if (!this.forgotPasswordEmail.trim()) {
      this.isForgotEmailValid = false;
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isForgotEmailValid = emailPattern.test(this.forgotPasswordEmail);
  }
}
