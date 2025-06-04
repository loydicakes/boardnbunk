import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landlord-home',
  templateUrl: './landlord-home.page.html',
  styleUrls: ['./landlord-home.page.scss'],
  standalone: false,
})
export class LandlordHomePage implements OnInit {
  totalRooms: number = 0;
  rentedRooms: number = 0;
  availableRooms: number = 0;
  totalTenants: number = 0;
  totalRequests: number = 0;
  currentUserId: string = '';

  constructor(private firestoreService: FirestoreService, private router:Router) {}

  async ngOnInit() {
     const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.currentUserId = parsedUser.uid;
      } else {
        this.router.navigate(['/login']);
        return;
      }

    const allRooms = await this.firestoreService.getAllRooms();
    this.totalRooms = allRooms.length;
    this.rentedRooms = allRooms.filter(room => room.tenants.length > 0).length;
    this.availableRooms = allRooms.filter(room => room.availability === true).length;

    // Count total tenants across all rooms
    this.totalTenants = await this.firestoreService.getTenantCount();
    this.totalRequests = await this.firestoreService.getRequestCount();
  }
}
