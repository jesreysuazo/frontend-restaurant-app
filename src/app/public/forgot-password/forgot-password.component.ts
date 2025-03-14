import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  token = '';
  password: string = '';
  successMsg = ''
  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'] ? params['token'] : '';
      console.log('Query Params:', this.token);

    });
  }

  submitNewPassword() {
    console.log('New Password:', this.password);
    const payload = {
      "newPassword": this.password
    }
    this.authService.resetPassword(payload, this.token).subscribe( {
      next: (res) => {
        console.log('Registration response:', res);
        this.successMsg = res.message;
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        console.error('Register error:', err.error.text);
        this.successMsg = err.error.text;
        setTimeout(() => this.router.navigate(['/']), 2000);

      },
      complete: () => {

      }
    })
  }
}
