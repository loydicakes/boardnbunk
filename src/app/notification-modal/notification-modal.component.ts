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

  getTimeAgo(timestamp: any): string {
  const now = new Date().getTime();
    const time = timestamp?.seconds ? timestamp.seconds * 1000 : new Date(timestamp).getTime();
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute(s) ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour(s) ago`;
    const days = Math.floor(hours / 24);
    return `${days} day(s) ago`;
  }

}
