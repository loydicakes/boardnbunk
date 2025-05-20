import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-pm',
  templateUrl: './profile-pm.page.html',
  styleUrls: ['./profile-pm.page.scss'],
  standalone: false,
})
export class ProfilePmPage implements OnInit {
  selectedPayment: string = 'cash'; // default selection

  constructor(private router: Router) { }

  ngOnInit() { }

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
