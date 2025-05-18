import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  standalone: false,
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.page.html',
  styleUrls: ['./landlord-profile.page.scss'],
})
export class LandlordProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    //edit profile
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
  //end edit profile

  //logout

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

  confirmLogout() {
    // Add actual logout logic here
    //this.router.navigate(['/login']); // Example redirect
    this.closeLogoutCard();
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
