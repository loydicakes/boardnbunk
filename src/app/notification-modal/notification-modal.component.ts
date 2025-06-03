
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  standalone: false,
})
export class NotificationModalComponent implements OnInit {
  notifications: any[] = [];
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

    const userDoc = await this.firestoreService.getDocument('users', this.currentUserId);
    this.notifications = userDoc?.['notifications'] || [];
  }
}
