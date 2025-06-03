import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  standalone: false,
})
export class NotificationModalComponent {
  @Input() notification: any;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  markAsRead() {
    this.modalCtrl.dismiss({ action: 'read', id: this.notification?.id });
  }

  delete() {
    this.modalCtrl.dismiss({ action: 'delete', id: this.notification?.id });
  }
}
