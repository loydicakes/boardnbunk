import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  standalone: false,
  selector: 'app-add-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss']
})
export class RoomPage implements OnInit {
  roomForm: FormGroup;
  previewUrl: string | null = null;
  usersList: { id: string; firstname: string; lastname: string; email: string }[] = [];
  currentUserId: string = '';
  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
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
     const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.currentUserId = parsedUser.uid;
      } else {
        this.router.navigate(['/login']);
        return;
      }
    this.roomForm.get('availability')?.valueChanges.subscribe((available) => {
      if (available) {
        this.roomForm.get('tenants')?.setValue('None');
      } else {
        this.roomForm.get('tenants')?.setValue('');
      }
    });

    // Load users for tenant selection
    this.loadUsers();
  }

  async loadUsers() {
    this.usersList = await this.firestoreService.getAllUsers();
  }

  async openTenantSelector() {
    const alert = await this.alertController.create({
      header: 'Select Tenant',
      inputs: this.usersList.map(user => ({
        name: 'tenant',
        type: 'radio',
        label: `${user.firstname} ${user.lastname}`,
        value: `${user.firstname} ${user.lastname}`
      })),
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (selectedTenant: string) => {
            this.addTenant(selectedTenant);
          }
        }
      ]
    });

    await alert.present();
  }

  addTenant(name: string) {
    const currentTenants = this.roomForm.get('tenants')?.value;
    let tenantsArray: string[] = [];

    if (currentTenants && currentTenants.trim() !== '' && currentTenants !== 'None') {
      tenantsArray = currentTenants.split(',').map((t: string) => t.trim());
    }

    // Avoid duplicates
    if (!tenantsArray.includes(name)) {
      tenantsArray.push(name);
      this.roomForm.get('tenants')?.setValue(tenantsArray.join(', '));
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      this.previewUrl = tempUrl;
      this.roomForm.patchValue({ image: tempUrl });
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
      image: formData.image
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
