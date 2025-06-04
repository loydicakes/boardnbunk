import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc as afsDoc, Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { arrayUnion, doc, updateDoc } from '@angular/fire/firestore';
import { FirestoreService } from '../services/firestore.service';

interface RequestItem {
  id: string;
  name: string;
  datentime: Timestamp;
  roomName: string;
  roomType: string;
  paymentMethod: string;
  userId: string;
  image: string;
}

@Component({
  standalone: false,
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  requests: RequestItem[] = [];
  currentUserId: string = '';

  constructor(
    private firestore: Firestore,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserId = parsedUser.uid;
    } else {
      this.router.navigate(['/login']);
      return;
    }
    await this.loadRequests();
  }

  async loadRequests() {
    const snapshot = await getDocs(collection(this.firestore, 'request'));
    this.requests = snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as any;
      return {
        id: docSnap.id,
        name: data.name,
        datentime: data.datentime,
        roomName: data.roomName || 'N/A',
        roomType: data.roomType || 'N/A',
        paymentMethod: data.paymentMethod || 'Not Set',
        userId: data.userId,
        image: data.image || 'assets/1.jpg',
      };
    });
  }

  async deleteRequest(id: string) {
    await deleteDoc(afsDoc(this.firestore, 'request', id));
    this.requests = this.requests.filter((r) => r.id !== id);
  }

  async approveRequest(request: RequestItem) {
    const now = new Date();
    const nextDue = new Date(now);
    nextDue.setMonth(nextDue.getMonth() + 1);

    const approvedData = {
      name: request.name,
      userId: request.userId,
      image: request.image || 'assets/img/default-user.png',
      roomName: request.roomName || 'N/A',
      roomType: request.roomType || 'N/A',
      paymentMethod: request.paymentMethod || 'Not Set',
      approvedDate: now,
      paymentStatus: false,
      lastPaid: null,
      nextDue: nextDue,
    };

    await this.firestoreService.addDocument('tenants', approvedData);

    const rooms = await this.firestoreService.getCollection('room');
    const matchedRoom = rooms.find((r: any) => r.name === request.roomName);
    if (matchedRoom) {
      const updatedTenantList = Array.isArray(matchedRoom.tenants)
        ? [...matchedRoom.tenants, request.name]
        : [request.name];
      await this.firestoreService.updateDocument('room', matchedRoom.id, {
        tenants: updatedTenantList,
      });
    }

    await updateDoc(doc(this.firestore, 'users', request.userId), {
      notifications: arrayUnion({
        message: 'Request Approved',
        timestamp: new Date(),
        read: false,
      }),
    });

    await this.deleteRequest(request.id);
  }

  openChat(request: any) {
    this.router.navigate(['/chat'], {
      queryParams: {
        userId: request.id,
        userName: request.name,
      },
    });
  }
}
