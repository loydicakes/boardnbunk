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
  selectedPayment: string = 'cash'; // default selection
  cardNumber: string = '';
  gcashNumber: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

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
      paymentMethod: this.selectedPayment
    };

    if (this.selectedPayment === 'card') {
      updateData.cardNumber = this.cardNumber;
    } else if (this.selectedPayment === 'gcash') {
      updateData.gcashNumber = this.gcashNumber;
    }

    try {
      await this.firestoreService.updateUserProfile(uid, updateData);
      console.log('Payment method saved:', updateData);
    } catch (err) {
      console.error('Failed to save payment method:', err);
    }
  }
}
