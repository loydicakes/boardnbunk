import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  selectedType: string = '';
  rooms: any[] = [];
  currentUserId: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async user => {
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
      this.currentUserId = user.uid;
      await this.loadFavorites();
    });
  }

  async loadFavorites() {
    const favorites = await this.firestoreService.getUserFavorites(this.currentUserId);
    this.rooms = favorites.map(fav => ({
      ...fav,
      favorited: true,
      imageUrl: fav.image || 'https://via.placeholder.com/100',
    }));
  }

  filterRooms(type: string) {
    this.selectedType = type;
  }

  get filteredRooms() {
    if (!this.selectedType) return this.rooms;
    if (this.selectedType === 'studio')
      return this.rooms.filter(room => room.type?.toLowerCase().includes('studio'));
    if (this.selectedType === 'bedspacer')
      return this.rooms.filter(room => room.type?.toLowerCase().includes('bedspace'));
    return this.rooms.filter(room => room.type?.toLowerCase().includes('solo'));
  }

  async toggleFavorite(room: any) {
    if (this.currentUserId && room?.id) {
      await this.firestoreService.removeRoomFromUserFavorites(this.currentUserId, room.id);
      this.rooms = this.rooms.filter(r => r.id !== room.id);
    }
  }
}
