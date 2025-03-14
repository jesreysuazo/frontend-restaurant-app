import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verification',
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
  standalone: true
})
export class VerificationComponent implements OnInit {
  token = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      console.log('Query Params:', params);
      this.token = params['token'] ? params['token'] : '';
      this.authService.verifyUser(this.token).subscribe(res => {
        console.log(res)
      })
    });
  }


}
