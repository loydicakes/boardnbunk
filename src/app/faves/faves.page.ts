import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  standalone: false,
  selector: 'app-faves',
  templateUrl: './faves.page.html',
  styleUrls: ['./faves.page.scss'],
  animations: [
    trigger('fadeSlideAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class FavesPage implements OnInit {
  categories = ['All', 'Solo', 'Couple', 'Small Fam', 'BedSpace'];
  selectedCategory = 'All';
  rooms: any[] = [];
  selectedRoom: any = null;
  showMessageBox = false;
  currentUserId: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const parsedUser = JSON.parse(user);
    this.currentUserId = parsedUser.uid;

    await this.loadFavorites();
  }

  async loadFavorites() {
    const favorites = await this.firestoreService.getUserFavorites(this.currentUserId);

    this.rooms = favorites.map(fav => ({
      ...fav,
      rating: 4 + Math.random(), // optional: remove or replace with real rating
      favorited: true,
      imageUrl: fav.image || 'https://via.placeholder.com/100',
      location: fav.location || 'Unknown floor', // optional: if not stored
    }));
  }


  get filteredRooms() {
    if (this.selectedCategory === 'All') {
      return this.rooms;
    }
    return this.rooms.filter(room => room.type === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleFavorite(room: any) {
    this.selectedRoom = room;
    this.showMessageBox = true;
  }

  cancel() {
    this.showMessageBox = false;
    this.selectedRoom = null;
  }

  async remove() {
    if (this.currentUserId && this.selectedRoom?.id) {
      await this.firestoreService.removeRoomFromUserFavorites(this.currentUserId, this.selectedRoom.id);
      this.rooms = this.rooms.filter(r => r.id !== this.selectedRoom.id);
    }
    this.cancel();
  }
}
