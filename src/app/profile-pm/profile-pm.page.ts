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

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProfileMethod() {
    this.router.navigate(['/profile']);
  }
}
