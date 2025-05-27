import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { RoomEditModalPage } from '../room-edit-modal/room-edit-modal.page';

interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  availability: boolean;
  tenants: string[];
}

@Component({
  standalone: false,
  selector: 'app-room-unavailable-list',
  templateUrl: './room-unavailable-list.page.html',
  styleUrls: ['./room-unavailable-list.page.scss'],
})
export class RoomUnavailableListPage implements OnInit {
  rooms: Room[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController // ✅ Inject AlertController
  ) {}

  async ngOnInit() {
    const allRooms = await this.firestoreService.getAllRooms();
    this.rooms = allRooms.filter(
      room => !room.availability && Array.isArray(room.tenants) && room.tenants.length > 0
    );
    console.log('Unavailable rooms with tenants:', this.rooms);
  }

  async openEditModal(room: Room) {
    const modal = await this.modalCtrl.create({
      component: RoomEditModalPage,
      componentProps: { room }
    });

    modal.onDidDismiss().then(res => {
      if (res.data === true) {
        this.ngOnInit(); // Reload filtered list
      }
    });

    return await modal.present();
  }

  async deleteRoom(roomId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this room?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            await this.firestoreService.deleteRoom(roomId); // ✅ Use Firestore service
            this.rooms = this.rooms.filter(room => room.id !== roomId); // ✅ Update local list
          }
        }
      ]
    });

    await alert.present();
  }
}
