import { HttpHeaders } from '@angular/common/http';

export function getHttpOptions(): { headers: HttpHeaders } {
  const token = localStorage.getItem('tokenKey') || '';
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  };
}