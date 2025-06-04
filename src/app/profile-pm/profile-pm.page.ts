import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-profile-pm',
  templateUrl: './profile-pm.page.html',
  styleUrls: ['./profile-pm.page.scss'],
  standalone: false,
})
export class ProfilePmPage implements OnInit {
    paymentMethod: string = 'cash';
    cardNumber: string = '';
    gcashNumber: string = '';
    currentUserId: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
     const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.currentUserId = parsedUser.uid;
      } else {
        this.router.navigate(['/login']);
        return;
      }
  }

  goToProfileMethod() {
    this.router.navigate(['/profile']);
  }

  showSaveCard() {
    const overlay = document.getElementById('saveOverlay');
    const card = document.getElementById('saveCard');
    if (overlay && card) {
      overlay.style.display = 'block';
      card.style.display = 'block';
    }
  }

  closeSaveCard() {
    const overlay = document.getElementById('saveOverlay');
    const card = document.getElementById('saveCard');
    if (overlay && card) {
      overlay.style.display = 'none';
      card.style.display = 'none';
    }
  }

  async confirmSave() {
    this.closeSaveCard();

    const user = await this.afAuth.currentUser;
    if (!user) return;

    const uid = user.uid;
    let updateData: any = {
      paymentMethod: this.paymentMethod
    };

    if (this.paymentMethod === 'card') {
      updateData.cardNumber = this.cardNumber;
    } else if (this.paymentMethod === 'gcash') {
      updateData.gcashNumber = this.gcashNumber;
    }

    try {
      await this.firestoreService.updateUserProfile(uid, updateData);
      console.log('Payment method saved:', updateData);
    } catch (err) {
      console.error('Failed to save payment method:', err);
    }
  }
  async savePaymentMethod() {
    const user = await this.firestoreService.ngFireBase.currentUser;
    if (!user) return;

    const data = {
      paymentMethod: this.paymentMethod, // e.g., 'card' or 'gcash'
      cardNumber: this.paymentMethod === 'card' ? this.cardNumber : undefined,
      gcashNumber: this.paymentMethod === 'gcash' ? this.gcashNumber : undefined,
    };

    try {
      await this.firestoreService.updateUserPaymentMethod(user.uid, data);
      console.log('Payment method updated successfully');
    } catch (error) {
      console.error('Failed to update payment method:', error);
    }
  }

}
