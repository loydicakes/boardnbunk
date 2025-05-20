import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-pns',
  templateUrl: './profile-pns.page.html',
  styleUrls: ['./profile-pns.page.scss'],
  standalone: false,
})
export class ProfilePnsPage implements OnInit {

  // Password input values
  currentPassword: string = 'tralalerotralala';
  newPassword: string = '';
  confirmPassword: string = '';

  // Visibility toggles
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  togglePassword(field: string): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
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

  confirmSave() {
    this.closeSaveCard();
    // Add save logic here (e.g., show success toast, save to server, etc.)
    console.log('Changes saved!');
  }
}
