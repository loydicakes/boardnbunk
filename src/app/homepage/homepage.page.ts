import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService, Room } from '../services/firestore.service';

@Component({
  standalone: false,
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedType: string = '';
  searchTerm: string = '';

  constructor(private router: Router, private firestoreService: FirestoreService) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User is logged in:', parsedUser.email);
    } else {
      console.log('No user session found.');
      this.router.navigate(['/login']);
      return;
    }

    // Load all available rooms once
    this.rooms = (await this.firestoreService.getAvailableRooms()) || [];
    this.filteredRooms = [...this.rooms];
  }

  // Filter rooms by category (type)
  async filterRooms(type: string) {
    this.selectedType = type;
    // For local filtering:
    // this.applyFilters();

    // OR, for server-side filtering, uncomment this block:
    /*
    this.rooms = await this.firestoreService.getRoomsByType(type);
    this.applySearchFilter();
    */

    // Here we do local filtering for simplicity:
    this.applyFilters();
  }

  // Apply both category and search filters locally
  applyFilters() {
    this.filteredRooms = this.rooms.filter((room) => {
      const matchesType = this.selectedType ? room.type === this.selectedType : true;
      const matchesSearch = this.searchTerm
        ? room.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }
}
