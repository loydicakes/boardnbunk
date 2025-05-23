import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  standalone: false,
  selector: 'app-room-edit-modal',
  templateUrl: './room-edit-modal.page.html',
  styleUrls: ['./room-edit-modal.page.scss'],
})
export class RoomEditModalPage implements OnInit {
  @Input() room: any;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private firestore: Firestore
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      availability: [true],
      tenants: ['']
    });
  }

  ngOnInit() {
    if (this.room) {
      const tenantsStr = this.room.tenants ? this.room.tenants.join(', ') : 'None';
      this.editForm.patchValue({
        name: this.room.name,
        type: this.room.type,
        price: this.room.price,
        availability: this.room.availability,
        tenants: tenantsStr
      });

      this.editForm.get('availability')?.valueChanges.subscribe((available) => {
        if (available) {
          this.editForm.get('tenants')?.setValue('None');
        } else {
          this.editForm.get('tenants')?.setValue('');
        }
      });
    }
  }

  async submitEdit() {
    const formValue = this.editForm.value;
    const tenantsArray = formValue.availability
      ? []
      : formValue.tenants
          ? formValue.tenants.split(',').map((t: string) => t.trim())
          : [];

    const updatedRoom = {
      name: formValue.name,
      type: formValue.type,
      price: formValue.price,
      availability: formValue.availability,
      tenants: tenantsArray
    };

    const roomDoc = doc(this.firestore, 'room', this.room.id);
    await updateDoc(roomDoc, updatedRoom);
    this.modalCtrl.dismiss(true);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
