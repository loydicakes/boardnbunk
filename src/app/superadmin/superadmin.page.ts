import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  standalone:false,
  selector: 'app-superadmin',
  templateUrl: './superadmin.page.html',
  styleUrls: ['./superadmin.page.scss'],
})
export class SuperadminPage implements OnInit {
  totalRooms: number = 0;
  rentedRooms: number = 0;
  availableRooms: number = 0;

  totalUsers: number = 0;
  roomRequests: number = 0;

  roomTypes: { solo: number; studio: number; bedSpacer: number; other: number } = {
    solo: 0,
    studio: 0,
    bedSpacer: 0,
    other: 0,
  };

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    const allRooms = await this.firestoreService.getAllRooms();
    this.totalRooms = allRooms.length - 1;
    this.rentedRooms = allRooms.filter(room => room.tenants.length > 0).length;
    this.availableRooms = allRooms.filter(room => room.availability === true).length;
  }
}
