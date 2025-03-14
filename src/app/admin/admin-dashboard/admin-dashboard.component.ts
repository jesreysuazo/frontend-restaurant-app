import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Router, RouterOutlet } from '@angular/router';
import { ManageMenuComponent } from '../manage-menu/manage-menu.component';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { ManageOrdersComponent } from '../manage-orders/manage-orders.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ManageMenuComponent,ManageCustomersComponent,ManageOrdersComponent,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: true
})
export class AdminDashboardComponent implements OnInit {
  selectedTab = 0;

  tabs = [
    { label: 'Manage Menu' },
    { label: 'Manage Customers' },
    { label: 'Manage Orders' }
  ];
  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    // this.fetchAllProducts();
  }

  // fetchAllProducts(){
  //   this.orderService.fetchAllProducts().subscribe(res => {
  //     console.log('all products:', res)
  //   })
  // }

  navigateTo(section: string) {
    this.router.navigate([`/admin/${section}`]);
  }
}
