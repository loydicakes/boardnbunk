import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  standalone: false,
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  animations: [
    trigger('slideUpDown', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ReviewsPage implements OnInit {
  roomId: string | null = null;
  reviews: any[] = [];
  newReview: string = '';
  currentUser: any;
  showReviewBox: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    if (this.roomId) {
      this.reviews = await this.firestoreService.getReviewsForRoom(this.roomId);
    }
  }

  async submitReview() {
    if (!this.newReview.trim() || !this.roomId || !this.currentUser) return;

    await this.firestoreService.submitReview(
      this.roomId,
      this.currentUser.uid,
      this.newReview,
      this.currentUser.email
    );

    this.newReview = '';
    this.showReviewBox = false;
    this.reviews = await this.firestoreService.getReviewsForRoom(this.roomId);
  }

  handleOutsideClick(event: Event) {
    if (this.showReviewBox) {
      this.showReviewBox = false;
    }
  }
}
