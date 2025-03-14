import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { User, UserStatus } from '../../core/models/user.model';



@Component({
  selector: 'app-manage-customers',
  imports: [CommonModule],
  templateUrl: './manage-customers.component.html',
  styleUrl: './manage-customers.component.css',
  standalone: true
})
export class ManageCustomersComponent implements OnInit {
  users: User[] = [];
  UserStatus = UserStatus
  selectedUser: User | null = null;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((data) => {
      this.users = data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
    });
  }
  makeAdmin(user: User) {
    this.adminService.makeAdmin(user.id).subscribe({
      next: () => {
        this.loadUsers(); 
      },
      error: (err) => {
        this.loadUsers(); 
      },
      complete: () =>{
        this.loadUsers(); 
      }
    });
  }

  deleteUser(user: User) {
    this.adminService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers(); 
      },
      error: (err) => {
        this.loadUsers(); 
      },
      complete: () =>{
        this.loadUsers(); 
      }
    });
  }
  viewInfo(user: User) {
    console.log("Opening modal for:", user.name);
    this.selectedUser = user;
  }

  closeModal() {
    console.log("Closing modal");
    this.selectedUser = null;
  }
}