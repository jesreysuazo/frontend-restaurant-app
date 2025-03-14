import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';
import { Order, Product } from '../../../core/models/cart.model';
import { AdminService } from '../../../core/services/admin.service';
import { Checkout } from '../../../core/models/checkout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() openAuthModal = new EventEmitter<boolean>();
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isCustomer$!: Observable<boolean>;
  private eventSubscription!: Subscription;
  cartProducts: Product[] = []
  totalPrice = 0;
  cart: Order | null = null
  orders: Checkout[] = []
  products = []
  expandedOrderId: number | null = null;
  activeTab: 'cart' | 'orders' = 'cart';

  isLoggedin = false;
  isAdmin = false;
  isCustomer = false;

  showProfileModal = false;
  showCartPanel = false;
  sortedOrders: Checkout[] = [];


  constructor(
    private authService: AuthService, 
    private orderService: OrdersService, 
    private adminService: AdminService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.isAdmin();
    this.isCustomer$ = this.authService.isCustomer();

    this.isLoggedIn$.subscribe(status => this.isLoggedin = status);
    this.isAdmin$.subscribe(status => this.isAdmin = status);
    this.isCustomer$.subscribe(status => this.isCustomer = status);

    this.eventSubscription = this.orderService.event$.subscribe(() => {
      this.fetchCart()
    })
    this.eventSubscription = this.authService.event$.subscribe(() => {
      this.toggleAuthModal()
    })

    if(this.isLoggedin){
      this.fetchCart();
      this.fetchOrders();
      this.fetchProducts()
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe(); // Prevent memory leaks
  }

  toggleAuthModal() {
    this.openAuthModal.emit(true);
  }

  toggleProfileModal(event: Event) {
    event.stopPropagation();
    this.showProfileModal = !this.showProfileModal;
  }

  logout() {
    this.authService.logout();
    this.showProfileModal = false;
  }

  toggleCartPanel() {
    this.showCartPanel = !this.showCartPanel;
  }

  closeCartPanel() {
    this.showCartPanel = false;
  }

  fetchCart() {
    this.orderService.viewCart().subscribe((res: Order) => {
      this.cart = res
      this.cartProducts = res.products
      this.totalPrice = this.cartProducts.reduce((sum, product) => sum + product.price, 0);
    })
  }

  checkout() {
    if (!this.cart) return;
    const payload = {
      "cartId": this.cart.id
    }
    this.orderService.checkOut(payload).subscribe(res => {
      this.fetchCart()
    })
  }
  removeItem(product: any) {
    if (!this.cart) return;
    const arr = this.findDuplicates(this.cart, product.id)
    this.orderService.removeItem([product.id]).subscribe(res => {
      this.fetchCart()
      if (arr.length != 0) {
        this.orderService.addToCart(arr).subscribe(res => {
          this.fetchCart()
        })
      }
    })
  }

  findDuplicates(data: Order, productId: number) {
    const count = data.products.filter(product => product.id === productId).length;
    return count > 1 ? new Array(count - 1).fill(productId) : [];
  }

  fetchOrders() {
    this.adminService.getOrders().subscribe(res => {
      console.log(res)
      this.orders = res;
      this.sortedOrders = this.orders.sort((a, b) => b.id - a.id);
    })
  }
  fetchProducts() {
    this.orderService.fetchAvailableProducts().subscribe(res => {
      this.products = res
    })
  }

  getProductNames(productIds: number[]): string {
    return productIds.map(id => {
      const product: any = this.products.find((p: any) => p.id === id);
      return product ? product.name : `Unknown Product (ID: ${id})`;
    }).join(', ');
  }

  toggleOrderDetails(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  getStatusClass(status: string): string {
    return {
      'APPROVED': 'status-approved',
      'PENDING': 'status-pending',
      'REJECTED': 'status-rejected'
    }[status] || 'status-default';
  }

  nav() {
    this.router.navigate(['/']);
  }
  
  navtoDashboard(){
    this.router.navigate(['/admin']);
  }
}
