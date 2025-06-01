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
  currentUserId: string = '';
  favoriteIds: Set<string> = new Set();

  constructor(private router: Router, private firestoreService: FirestoreService) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserId = parsedUser.uid;
    } else {
      this.router.navigate(['/login']);
      return;
    }

    this.rooms = (await this.firestoreService.getAvailableRooms()) || [];
    await this.loadUserFavorites();
    this.filteredRooms = this.rooms.map(room => ({
      ...room,
      isFavorite: this.favoriteIds.has(room.id)
    }));
  }

  async loadUserFavorites() {
    const favorites = await this.firestoreService.getUserFavorites(this.currentUserId);
    this.favoriteIds = new Set(favorites.map(fav => fav.id));
  }

  filterRooms(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRooms = this.rooms
      .filter(room => {
        const matchesType = this.selectedType ? room.type === this.selectedType : true;
        const matchesSearch = this.searchTerm
          ? room.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;
        return matchesType && matchesSearch;
      })
      .map(room => ({
        ...room,
        isFavorite: this.favoriteIds.has(room.id)
      }));
  }

  async toggleFavorite(room: any) {
    if (!this.currentUserId) return;

    if (room.isFavorite) {
      await this.firestoreService.removeRoomFromUserFavorites(this.currentUserId, room.id);
      this.favoriteIds.delete(room.id);
    } else {
      await this.firestoreService.addRoomToUserFavorites(this.currentUserId, {
        id: room.id,
        name: room.name,
        type: room.type,
        price: room.price
      });
      this.favoriteIds.add(room.id);
    }

    room.isFavorite = !room.isFavorite;
  }
}
