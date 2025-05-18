import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landlord-home',
  templateUrl: './landlord-home.page.html',
  styleUrls: ['./landlord-home.page.scss'],
  standalone:false, 
})
export class LandlordHomePage implements OnInit {

  searchFocused: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
