import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { RoomEditModalPage } from '../room-edit-modal/room-edit-modal.page';
import { ModalController } from '@ionic/angular';


interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  availability: boolean;
  tenants: string[]; // ✅ required
}

@Component({
  standalone: false,
  selector: 'app-room-unavailable-list',
  templateUrl: './room-unavailable-list.page.html',
  styleUrls: ['./room-unavailable-list.page.scss'],
})

export class RoomUnavailableListPage implements OnInit {
  rooms: Room[] = [];

  constructor(private firestoreService: FirestoreService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    const allRooms = await this.firestoreService.getAllRooms();
    this.rooms = allRooms.filter(room => !room.availability && Array.isArray(room.tenants) && room.tenants.length > 0);
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
}
