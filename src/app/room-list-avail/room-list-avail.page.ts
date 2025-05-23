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
}

@Component({
  standalone: false,
  selector: 'app-room-list-avail',
  templateUrl: './room-list-avail.page.html',
  styleUrls: ['./room-list-avail.page.scss'],
})
export class RoomListAvailPage implements OnInit {
  rooms: Room[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.loadRooms();
  }

  async loadRooms() {
    const allRooms = await this.firestoreService.getAllRooms();
    this.rooms = allRooms.filter(room => room.availability === true);
    console.log('Available rooms only:', this.rooms);
  }
  
  async deleteRoom(roomId: string) {
    await this.firestoreService.deleteRoom(roomId);
    this.rooms = this.rooms.filter(room => room.id !== roomId);
  }

  async openEditModal(room: Room) {
    const modal = await this.modalCtrl.create({
      component: RoomEditModalPage,
      componentProps: { room }
    });

    modal.onDidDismiss().then((res) => {
      if (res.data === true) {
        this.loadRooms(); // Refresh if updated
      }
    });

    return await modal.present();
  }
}
