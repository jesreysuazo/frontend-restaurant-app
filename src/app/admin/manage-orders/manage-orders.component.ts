import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Order, Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = [];
  productArr: Product[]= []
  selectedOrder: Order | null = null;


  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe((data) => {
      this.productArr = data;
    });
  }

  loadOrders(){
    this.adminService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  selectOrder(order: Order) {
    this.selectedOrder = order; // Ensure it gets a valid order
  }

  // approveOrder(orderId: number) {
  //   this.adminService.approveOrder(orderId).subscribe(() => {
  //     // Refresh orders
  //   });
  // }

  // rejectOrder(orderId: number) {
  //   this.adminService.rejectOrder(orderId).subscribe(() => {
  //     // Refresh orders
  //   });
  // }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  getProductNames(productIds: number[]): string {
    return productIds
      .map((id) => this.productArr.find((p) => p.id === id)?.name || 'Unknown Product')
      .join(', ');
  }

  viewDetails(order: any) {
    this.selectedOrder = {
      ...order,
      productNames: this.getProductNames(order.productIds),
    };
  }

  closeModal() {
    this.selectedOrder = null;
  }

  acceptOrder(order: any) {
    this.adminService.approveOrder(order.id).subscribe((res) => {
      this.loadOrders()
    })
  }

  rejectOrder(order: any) {
    this.adminService.rejectOrder(order.id).subscribe((res) => {
      this.loadOrders()
    })
  }
}
