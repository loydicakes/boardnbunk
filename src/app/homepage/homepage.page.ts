import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

  interface Room {
    id: string;
    name: string;
    price: number;
    type: string;
    image: string;
    availability: boolean;
    tenants: string[];
  }
@Component({
  standalone: false,
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  rooms: Room[] = [];
  constructor(private router: Router, private firestoreService: FirestoreService) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User is logged in:', parsedUser.email);
    } else {
      console.log('No user session found.');
      this.router.navigate(['/login']);
    }

    const allRooms = await this.firestoreService.getAllRooms();
    this.rooms = allRooms.filter(room => room.availability);
  }
}
