import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-add-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private toastController: ToastController
  ) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      availability: [true],
      tenants: [''], // Will split by comma
      image: ['']
    });
  }

  ngOnInit() {}

  async submitRoom() {
    if (this.roomForm.valid) {
      const formData = this.roomForm.value;

      const roomData = {
        name: formData.name,
        type: formData.type,
        price: formData.price,
        availability: formData.availability,
        tenants: formData.tenants
          ? formData.tenants.split(',').map((t: string) => t.trim())
          : [],
        image: formData.image || ''
      };

      try {
        await this.firestoreService.addRoom(roomData);
        this.roomForm.reset({ availability: true, price: 0 });
        this.showToast('Room added successfully!');
      } catch (error) {
        this.showToast('Failed to add room.');
        console.error(error);
      }
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}
