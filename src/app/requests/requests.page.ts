import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface RequestItem {
  id: string;
  name: string;
  datentime: Timestamp;
}

@Component({
  standalone:false,
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  requests: RequestItem[] = [];
  currentUserId: string = '';
  constructor(private firestore: Firestore, private router: Router) {}

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
      };
    });
  }

  async deleteRequest(id: string) {
    await deleteDoc(doc(this.firestore, 'request', id));
    this.requests = this.requests.filter((r) => r.id !== id);
  }

  openChat(request: any) {
    const userId = request.id;
    const userName = request.name;

    this.router.navigate(['/chat'], {
      queryParams: {
        userId,
        userName
      }
    });
  }
}
