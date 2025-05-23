import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-add-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss']
})
export class RoomPage implements OnInit {
  roomForm: FormGroup;
  previewUrl: string | null = null;

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
      tenants: ['None'],
      image: ['']
    });
  }

  ngOnInit() {
    this.roomForm.get('availability')?.valueChanges.subscribe((available) => {
      if (available) {
        this.roomForm.get('tenants')?.setValue('None');
      } else {
        this.roomForm.get('tenants')?.setValue('');
      }
    });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      this.previewUrl = tempUrl;
      this.roomForm.patchValue({ image: tempUrl }); // store blob URL in form
    }
  }

  async submitRoom() {
    const formData = this.roomForm.value;

    const roomData = {
      name: formData.name,
      type: formData.type,
      price: formData.price,
      availability: formData.availability,
      tenants: formData.tenants && formData.tenants !== 'None'
        ? formData.tenants.split(',').map((t: string) => t.trim())
        : [],
      image: formData.image // This is just a blob: URL, not persistent
    };

    try {
      await this.firestoreService.addRoom(roomData);
      this.roomForm.reset({ availability: true, price: 0, tenants: 'None' });
      this.previewUrl = null;
      this.showToast('Room added with temporary image preview!');
    } catch (error) {
      this.showToast('Failed to add room.');
      console.error(error);
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
