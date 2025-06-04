import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.scss'],
})
export class PaymentMethodModalComponent {
  @Input() currentMethod!: string;
  selectedMethod: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.selectedMethod = this.currentMethod;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.modalCtrl.dismiss(this.selectedMethod);
  }
}
