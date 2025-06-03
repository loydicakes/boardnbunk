import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifs',
  templateUrl: './notifs.page.html',
  styleUrls: ['./notifs.page.scss'],
  standalone: false,
})
export class NotifsPage implements OnInit {
  notifications: any[] = [];
  currentUserId: string = ''; // ✅ You forgot this
  constructor(
    private firestoreService: FirestoreService,
    private router: Router // ✅ You also forgot to inject this
  ) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const parsedUser = JSON.parse(user);
    this.currentUserId = parsedUser.uid;

    const userDoc = await this.firestoreService.getDocument('users', this.currentUserId);
    this.notifications = userDoc?.['notifications'] || [];
  }
}
