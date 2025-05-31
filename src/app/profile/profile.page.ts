import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  displayName: string = '...';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private firestore: Firestore
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.displayName = 'Not Logged In';
      return;
    }

    const { uid } = JSON.parse(userData);

    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const user = userSnap.data();
      this.displayName = `${user['firstname'] || 'User'} ${user['lastname'] || ''}`.trim();
    } else {
      this.displayName = 'Unknown User';
    }
  }


  showLogoutCard() {
    const card = document.getElementById('logoutCard');
    const overlay = document.getElementById('logoutOverlay');
    if (card && overlay) {
      card.style.display = 'block';
      overlay.style.display = 'block';
    }
  }

  closeLogoutCard() {
    const card = document.getElementById('logoutCard');
    const overlay = document.getElementById('logoutOverlay');
    if (card && overlay) {
      card.style.display = 'none';
      overlay.style.display = 'none';
    }
  }

  async confirmLogout() {
    try {
      await this.firestoreService.logoutUser();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  //end logout

  goToPersonalSecurity() {
    this.router.navigate(['/profile-pns']);
  }

  goToPaymentMethod() {
    this.router.navigate(['/profile-pm']);
  }

  goToSettingsMethod() {
    this.router.navigate(['/settings']);
  }
}
