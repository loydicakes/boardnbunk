// profile.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  constructor(private firestoreService:FirestoreService, private router: Router) { } 

  ngOnInit() { }

  showPhotoCard() {
    const card = document.getElementById('photoCard');
    const overlay = document.getElementById('photoOverlay');
    if (card && overlay) {
      card.style.display = 'block';
      overlay.style.display = 'block';
    }
  }

  closePhotoCard() {
    const card = document.getElementById('photoCard');
    const overlay = document.getElementById('photoOverlay');
    if (card && overlay) {
      card.style.display = 'none';
      overlay.style.display = 'none';
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
