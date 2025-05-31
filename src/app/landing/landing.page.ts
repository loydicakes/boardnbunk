import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: false,
})
export class LandingPage {
  touchStartY = 0;

  constructor(private router: Router) {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  async onTouchEnd(event: TouchEvent) {
    const touchEndY = event.changedTouches[0].clientY;
    const swipeDistance = this.touchStartY - touchEndY;

    if (swipeDistance > 100) {
      await this.playTransition();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  async playTransition() {
    const animation = createAnimation()
      .addElement(document.querySelector('ion-content')!)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateY(0)', 'translateY(-100px)');

    await animation.play();
  }
}