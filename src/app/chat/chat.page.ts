import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService, ChatMessage } from '../services/firestore.service';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatMessages: ChatMessage[] = [];
  newMessage: string = '';
  currentUser: User | null = null;
  userName: string = '';
  userId: string = '';
  currentUid: string = '';
  currentAuthUid: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      const chatWithName = params['userName'] || 'User';

      const adminId = '07q1DtKQ4nS5gxzRc88KwN87yRJ3';
      this.currentUid = `${adminId}_${this.userId}`;

      this.firestoreService.getChatMessages().subscribe(messages => {
        this.chatMessages = messages.filter(msg => msg.uid === this.currentUid);
        console.log('[ADMIN] Loaded messages for UID:', this.currentUid, this.chatMessages);
        setTimeout(() => this.scrollToBottom(), 100);
      });
    });

    this.afAuth.authState.subscribe(async user => {
      this.currentUser = user;
      if (user) {
        this.currentAuthUid = user.uid;
        const allUsers = await this.firestoreService.getAllUsers();
        const current = allUsers.find(u => u.id === user.uid);
        this.userName = current ? `${current.firstname} ${current.lastname}` : user.email!;
      }
    });
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.userId || !this.currentUser) return;

    console.log('[ADMIN] Sending to UID:', `07q1DtKQ4nS5gxzRc88KwN87yRJ3_${this.userId}`);

    await this.firestoreService.sendChatMessage(
      this.userId,
      this.userName,
      this.newMessage.trim()
    );

    this.newMessage = '';
  }

  scrollToBottom() {
    const content = document.querySelector('ion-content');
    if (content) (content as any).scrollToBottom(300);
  }
}
