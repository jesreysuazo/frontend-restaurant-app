import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config';
import { getHttpOptions } from '../../shared/reusable/http-options';
import { Product, ProductPayload } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, getHttpOptions());
  }

  addProduct(product: ProductPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product, getHttpOptions());
  }

  updateProduct(id: number, product: ProductPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product, getHttpOptions());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }


  approveOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/approve`, {}, getHttpOptions());
  }

  rejectOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/reject`, {}, getHttpOptions());
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`, getHttpOptions());
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, getHttpOptions());
  }

  makeAdmin(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, {}, getHttpOptions());
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { ...getHttpOptions() });
  }

  
}