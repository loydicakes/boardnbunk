import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  searchFocused: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
