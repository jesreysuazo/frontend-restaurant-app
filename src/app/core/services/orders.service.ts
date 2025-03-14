import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../config';
import { JwtService } from './jwt.service';
import { User, Credentials } from '../models/auth.model';
import { getHttpOptions } from '../../shared/reusable/http-options';
import { Order } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.baseUrl}`;
  private fetchCart = new Subject<void>();
  event$ = this.fetchCart.asObservable();

  constructor(private http: HttpClient) {}

  fetchAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`, getHttpOptions());
  }

  fetchAvailableProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/available`);
  }

  addToCart(payload: number[]): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/cart/add`, payload, getHttpOptions());
  }

  removeItem(payload: number[]): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/cart/edit`, payload, getHttpOptions());
  }

  viewCart(): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/cart/view`, getHttpOptions());
  }

  cartListener(){
    this.fetchCart.next();
  }

  checkOut(payload:{"cartId":number}): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders/checkout`, payload,getHttpOptions());
  }

}
