import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  standalone:false,
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  roomId: string | null = null;
  reviews: any[] = [];
  newReview: string = '';
  currentUser: any;

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
    this.reviews = await this.firestoreService.getReviewsForRoom(this.roomId);
  }
}
