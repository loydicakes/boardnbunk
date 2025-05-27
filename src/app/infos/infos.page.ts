import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService, Room } from '../services/firestore.service';

@Component({
  standalone: false,
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {
  roomId: string | null = null;
  room: Room | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.room = await this.firestoreService.getRoomById(this.roomId);
    }
    this.loading = false;
  }

  isValidHttpUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }
}
