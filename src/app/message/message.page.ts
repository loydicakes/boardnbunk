import { Component, OnInit } from '@angular/core';
import { FirestoreService, ChatMessage } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  standalone: false,
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  chatMessages: ChatMessage[] = [];
  messageText: string = '';
  adminId = '07q1DtKQ4nS5gxzRc88KwN87yRJ3';
  userId: string = '';
  userName: string = '';
  currentUid: string = '';
  currentAuthUid: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = userData.uid;
    this.userName = userData.email || 'User';

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentAuthUid = user.uid;
        this.currentUid = `${this.adminId}_${this.userId}`; // generate only after auth
        console.log('[USER] userId:', this.userId);
        console.log('[USER] currentUid:', this.currentUid);
        this.loadChat(); 
      }
    });
  }

  loadChat() {
    if (!this.adminId || !this.userId) {
      console.error('Missing adminId or userId');
      return;
    }

    const chatRoomId1 = `${this.adminId}_${this.userId}`;
    const chatRoomId2 = `${this.userId}_${this.adminId}`;

    this.firestoreService.getChatMessages().subscribe((messages) => {
      this.chatMessages = messages.filter(msg =>
        msg.uid === chatRoomId1 || msg.uid === chatRoomId2
      );
      console.log('[USER] Messages loaded:', this.chatMessages);
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const chatUid = `${this.adminId}_${this.userId}`;
    console.log('[USER] Sending message with UID:', chatUid);
    this.firestoreService.sendChatMessage(
      this.userId,
      this.userName,
      this.messageText.trim(),
      chatUid
    ).then(() => {
      this.messageText = '';
    });
  }

  autoGrow(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
