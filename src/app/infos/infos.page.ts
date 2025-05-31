// infos.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService, Room } from '../services/firestore.service';
import { collection, doc, getDoc } from '@angular/fire/firestore';

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
  requestSent = false;

  
  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.room = await this.firestoreService.getRoomById(this.roomId);
    }
    await this.checkIfRequested();
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

  async checkIfRequested() {
    try {
      const user = await this.firestoreService.ngFireBase.currentUser;
      if (!user) {
        this.requestSent = false;
        return;
      }

      const usersCollection = collection(this.firestoreService['firestore'], 'users');
      const userDocRef = doc(usersCollection, user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        this.requestSent = false;
        return;
      }

      const userData = userSnap.data() as { firstname?: string; lastname?: string };
      const fullName = `${userData.firstname || ''} ${userData.lastname || ''}`.trim();

      if (!fullName) {
        this.requestSent = false;
        return;
      }

      this.requestSent = await this.firestoreService.hasUserRequested(fullName);
    } catch (error) {
      console.error('Error checking request status:', error);
      this.requestSent = false;
    }
  }

  async submitRequest() {
    try {
      const user = await this.firestoreService.ngFireBase.currentUser;
      if (!user) {
        console.error('No logged in user');
        return;
      }

      const usersCollection = collection(this.firestoreService['firestore'], 'users');
      const userDocRef = doc(usersCollection, user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.error('User document not found');
        return;
      }

      const userData = userSnap.data() as { firstname?: string; lastname?: string };
      const fullName = `${userData.firstname || ''} ${userData.lastname || ''}`.trim();

      if (!fullName) {
        console.error('User name fields are empty');
        return;
      }

      const now = new Date();
      await this.firestoreService.addRequest(fullName, now, user.uid);
      console.log('Request submitted with name and UID:', fullName, user.uid);

      this.requestSent = true;
    } catch (error) {
      console.error('Failed to submit request:', error);
    }
  }
}
