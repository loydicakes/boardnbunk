import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  standalone: false,
  selector: 'app-current-rent',
  templateUrl: './current-rent.page.html',
  styleUrls: ['./current-rent.page.scss'],
})
export class CurrentRentPage implements OnInit {
  currentTenant: any = null;
  loading = true;

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    console.log('[CurrentRentPage] INIT');

    const userData = localStorage.getItem('user');
    if (!userData) {
      console.log('[NO USER in LocalStorage]');
      this.loading = false;
      return;
    }

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.uid;
    console.log('[USER ID from storage]', userId);

    const tenants = await this.firestoreService.getCollection('tenants');

    tenants.forEach((t: any) => {
      console.log('Comparing', t.userId, '===', userId, '=>', t.userId === userId);
    });

    this.currentTenant = tenants.find((t: any) =>
      (t.userId || '').trim() === userId.trim()
    );

    console.log('[Current Tenant Found]', this.currentTenant);

    this.loading = false;
  }
  async payNow() {
    if (!this.currentTenant?.id) return;

    const now = new Date();

    // Get the last day of next month
    const nextDue = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    const updatedData = {
      lastPaid: now,
      nextDue: nextDue,
      paymentStatus: true
    };

    await this.firestoreService.updateDocument('tenants', this.currentTenant.id, updatedData);

    // Update local display after Firestore update
    this.currentTenant.lastPaid = now;
    this.currentTenant.nextDue = nextDue;
    this.currentTenant.paymentStatus = true;

    console.log('[Payment Updated]');
  }

}
