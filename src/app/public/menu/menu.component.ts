import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { AuthService } from '../../core/services/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';
import { DropdownOptions } from '../../core/models/enums';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  products: Product[] = []
  categories: string[] = Object.values(DropdownOptions);
  selectedCategory: string = '';
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isCustomer$!: Observable<boolean>;
  isLoggedin = false;
  isAdmin = false;
  isCustomer = false;

  constructor(private orderService: OrdersService, private authService: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.isAdmin();
    this.isCustomer$ = this.authService.isCustomer();
    this.isLoggedIn$.subscribe(status => this.isLoggedin = status);
    this.isAdmin$.subscribe(status => this.isAdmin = status);
    this.isCustomer$.subscribe(status => this.isCustomer = status);
    this.fetchProducts();
  }
  get filteredItems() {
    return this.selectedCategory
      ? this.products.filter((item) => item.category === this.selectedCategory)
      : this.products;
  }

  fetchProducts() {
    this.orderService.fetchAvailableProducts().subscribe(res => {
      this.products = res;
    })
  }

  addToCart(id: number) {
    // const payload = [id]
    // this.orderService.addToCart(payload).subscribe((res) => {
    //   this.orderService.cartListener();
    // })
    if (this.isLoggedin) {
      const payload = [id]
      this.orderService.addToCart(payload).subscribe((res) => {
        this.orderService.cartListener();
      })
    } else {
      this.authService.openAuth();
    }
  }
}
