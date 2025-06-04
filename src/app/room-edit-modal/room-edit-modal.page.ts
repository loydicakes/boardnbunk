import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  standalone: false,
  selector: 'app-room-edit-modal',
  templateUrl: './room-edit-modal.page.html',
  styleUrls: ['./room-edit-modal.page.scss'],
})
export class RoomEditModalPage implements OnInit {
  @Input() room: any;
  editForm: FormGroup;
  usersList: { id: string; firstname: string; lastname: string; email: string }[] = [];
  currentUserId: string = '';
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      availability: [true],
      tenants: ['']
    });
  }

  async ngOnInit() {
     const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.currentUserId = parsedUser.uid;
      } else {
        this.router.navigate(['/login']);
        return;
      }
    if (this.room) {
      const tenantsStr = this.room.tenants ? this.room.tenants.join(', ') : 'None';
      this.editForm.patchValue({
        name: this.room.name,
        type: this.room.type,
        price: this.room.price,
        availability: this.room.availability,
        tenants: tenantsStr
      });

        this.editForm.get('availability')?.valueChanges.subscribe(value => {
        const tenantsControl = this.editForm.get('tenants');
        if (value === false) {
          tenantsControl?.setValidators([Validators.required]);
        } else {
          tenantsControl?.clearValidators();
        }
        tenantsControl?.updateValueAndValidity();
      });
    }

    await this.loadUsers(); // load tenant list
  }

  async loadUsers() {
    const usersCol = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCol);
    this.usersList = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        firstname: data['firstname'],
        lastname: data['lastname'],
        email: data['email']
      };
    });
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
    const currentTenants = this.editForm.get('tenants')?.value;
    let tenantsArray: string[] = [];

    if (currentTenants && currentTenants.trim() !== '' && currentTenants !== 'None') {
      tenantsArray = currentTenants.split(',').map((t: string) => t.trim());
    }

    if (!tenantsArray.includes(name)) {
      tenantsArray.push(name);
      this.editForm.get('tenants')?.setValue(tenantsArray.join(', '));
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

  // ✅ Update the room document
  const roomDoc = doc(this.firestore, 'room', this.room.id);
  await updateDoc(roomDoc, updatedRoom);

  // ✅ If room is unavailable, save tenant(s) to the 'tenants' collection
  if (!formValue.availability && tenantsArray.length > 0) {
    const tenantsCol = collection(this.firestore, 'tenants');

    for (const tenantName of tenantsArray) {
      const matchedUser = this.usersList.find(
        (u) => `${u.firstname} ${u.lastname}` === tenantName
      );

      if (matchedUser) {
        const tenantData = {
          name: tenantName,
          roomName: formValue.name,
          roomType: formValue.type,
          userId: matchedUser.id,
          image: 'assets/1.jpg', // Optional: Set room image or user image
          approvedDate: new Date(),
          lastPaid: new Date(),
          nextDue: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          paymentMethod: 'gcash', // You can dynamically fetch this
          paymentStatus: true
        };

        await addDoc(tenantsCol, tenantData);
      }
    }
  }

  this.modalCtrl.dismiss(true);
}


  dismiss() {
    this.modalCtrl.dismiss();
  }
}
