import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.page.html',
  styleUrls: ['./faves.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeSlideAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class FavesPage {
  categories = ['All', 'Solo', 'Couple', 'Small Fam', 'BedSpace'];
  selectedCategory = 'All';

  rooms = [
    {
      name: 'BNB S23',
      type: 'Solo',
      location: '2nd floor, Blg. A',
      price: 10000,
      rating: 4.5,
      favorited: true,
      imageUrl: 'assets/imgs/solo.jpg', // Update this to your local path
    },
    {
      name: 'BNB C75',
      type: 'Couple',
      location: '7th floor, Blg. B',
      price: 12000,
      rating: 4.8,
      favorited: true,
      imageUrl: 'assets/imgs/couple.jpeg', // Update this to your local path
    },
    {
      name: 'BNB SF20',
      type: 'Small Fam',
      location: '2nd Floor, Blg. C',
      price: 15000,
      rating: 4.3,
      favorited: true,
      imageUrl: 'assets/imgs/small.jpeg', // Update this to your local path
    },
    {
      name: 'BNB BS1',
      type: 'BedSpace',
      location: '1st Floor, Blg. D',
      price: 9000,
      rating: 4.1,
      favorited: true,
      imageUrl: 'assets/imgs/bed.jpg', // Update this to your local path
    },
  ];

  get filteredRooms() {
    if (this.selectedCategory === 'All') {
      return this.rooms;
    }
    return this.rooms.filter(room => room.type === this.selectedCategory);
  }

  selectedRoom: any = null;
  showMessageBox = false;

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

  remove() {
    this.rooms = this.rooms.filter(r => r !== this.selectedRoom);
    this.showMessageBox = false;
    this.selectedRoom = null;
  }
}