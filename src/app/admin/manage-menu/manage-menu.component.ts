import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownOptions, Status } from '../../core/models/enums';
import { Product, ProductPayload } from '../../core/models/product.model';

@Component({
  selector: 'app-manage-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-menu.component.html',
  styleUrl: './manage-menu.component.css'
})
export class ManageMenuComponent implements OnInit {
  items: any[] = [];
  categories: string[] = Object.values(DropdownOptions);
  selectedCategory: string = ''; 
  statusOptions = [
    { label: 'ACTIVE', value: Status.ACTIVE },
    { label: 'DELETE', value: Status.DELETED }
  ];
  Status = Status;
  newItem: any = null;
  editedItem: any = null;
  modalItem: any = null;
  isLoading = false;
  errorMessage =''
  isNew = false;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe((data) => {
      this.items = data;
    });
  }

  get filteredItems() {
    return this.selectedCategory
      ? this.items.filter((item) => item.category === this.selectedCategory)
      : this.items;
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  isEditing(item: any): boolean {
    return this.editedItem && this.editedItem.id === item.id;
  }

  toggleEdit(item: any) {
    this.editedItem = { ...item };
  }

  cancelEdit() {
    this.editedItem = null;
  }

  addNewItem() {
    this.newItem = {
      name: '',
      price: null,
      category: '',
      description: '',
      imageUrl: '',
      status: ''
    };
    this.modalItem = this.newItem;
    this.isNew = true;
  }

  saveItem() {
    const payload: ProductPayload = {
      name: this.modalItem.name,
      category: this.modalItem.category,
      description: this.modalItem.description,
      imageUrl: this.modalItem.imageUrl,
      price: this.modalItem.price,
      status: this.modalItem.status
    }
    if(!this.isNew){
      this.adminService.updateProduct(this.modalItem.id, payload).subscribe({
        next: (res) => {
  
        },
        error: (err) => {
          console.error('Login error:', err.error);
          this.errorMessage = err.error
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
          this.loadProducts();
          this.closeModal()
        }
      })
    } else {
      this.adminService.addProduct(payload).subscribe({
        next: (res) => {
  
        },
        error: (err) => {
          console.error('Login error:', err.error);
          this.errorMessage = err.error
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
          this.loadProducts();
          this.closeModal()
        }
      })
    }

  }

  cancelNewItem() {
    this.newItem = null;
  }

  closeModal() {
    this.newItem = null;
    this.editedItem = null;
    this.modalItem = null;
  }
  
  isFormValid(): boolean {
    return !!(
      this.modalItem &&
      this.modalItem.name &&
      this.modalItem.price !== null &&
      this.modalItem.category &&
      this.modalItem.description &&
      this.modalItem.imageUrl &&
      this.modalItem.status
    );
  }

  editItem(item: any) {
    this.editedItem = { ...item };
    this.modalItem = this.editedItem;
  }
}