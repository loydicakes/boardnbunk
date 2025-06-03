import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  toggleDarkMode(event: any) {
    const enabled = event.detail.checked;
    document.body.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', String(enabled));
  }
}
