import { Component } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model'
import { CategorySubheaders } from '../../core/models/enums';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isCustomer$!: Observable<boolean>;
  products = []
  bestSeller = []
  valueMeals = []
  bibingMamon = []
  famFav = []
  partyPack = []
  riceBowl = []
  beverages = []
  activeCategory: string = 'bestSeller';
  activeSubheader: string = CategorySubheaders[this.activeCategory];
  showMenu: any = []
  isLoggedin = false;
  isAdmin = false;
  isCustomer = false;
  private eventSubscription!: Subscription;


  constructor(private orderService: OrdersService,private router: Router ,private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.isAdmin();
    this.isCustomer$ = this.authService.isCustomer();
    this.isLoggedIn$.subscribe(status => this.isLoggedin = status);
    this.isAdmin$.subscribe(status => this.isAdmin = status);
    this.isCustomer$.subscribe(status => this.isCustomer = status);
    this.fetchProducts();
  }

  fetchProducts() {
    this.orderService.fetchAvailableProducts().subscribe(res => {
      this.products = res;
      this.bestSeller = res.filter((product: Product) => product.category === 'BEST_SELLER')
      this.valueMeals = res.filter((product: Product) => product.category === 'VALUE_MEALS')
      this.bibingMamon = res.filter((product: Product) => product.category === 'BIBING_MAMON')
      this.famFav = res.filter((product: Product) => product.category === 'FAMILY_FAVORITES')
      this.partyPack = res.filter((product: Product) => product.category === 'PARTY_PACK')
      this.riceBowl = res.filter((product: Product) => product.category === 'RICE_BOWL')
      this.beverages = res.filter((product: Product) => product.category === 'BEVERAGES')
      this.showMenu = this.bestSeller.splice(0, 4)
    })
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.showMenu = this[category as keyof HomeComponent] || [];
    this.showMenu = this.showMenu.slice(0, 4)
    this.activeSubheader = CategorySubheaders[this.activeCategory]
  }

  addToCart(id: number) {
    if(this.isLoggedin){
      if(this.isAdmin){
        this.router.navigate(['/admin']);
      } else {
        const payload = [id]
        this.orderService.addToCart(payload).subscribe((res) => {
          this.orderService.cartListener();
        })
      }
    } else {
      this.authService.openAuth();
    }
  }

  navToMenu(){
    if(this.isAdmin){
      this.router.navigate(['/admin']);

    } else {
      this.router.navigate(['/menu']);
    }
  }
}
