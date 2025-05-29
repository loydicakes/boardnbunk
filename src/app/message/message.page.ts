import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ChatMessage } from '../services/firestore.service';

@Component({
  standalone: false,
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  selectedChat: boolean = false;
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
    this.currentUid = `${this.adminId}_${this.userId}`;

    this.afAuth.authState.subscribe(user => {
      if (user) this.currentAuthUid = user.uid;
    });
    console.log('[USER] userId:', this.userId);
    console.log('[USER] currentUid (filter key):', this.currentUid);
    this.loadChat();
  }

  loadChat() {
    this.afAuth.authState.subscribe(user => {
      if (!user) return;
      this.currentAuthUid = user.uid;

      this.firestoreService.getChatMessages().subscribe((messages) => {
        console.log('[USER] Filtering chatMessages for:', this.currentUid);
        this.chatMessages = messages.filter((msg) => msg.uid === this.currentUid);
        console.log('[USER] Loaded messages:', this.chatMessages);
      });
    });
  }

  sendMessage() {
    if (this.messageText.trim() !== '') {
      console.log('[USER] Sending message with UID:', this.currentUid);
      this.firestoreService
        .sendChatMessage(this.userId, this.userName, this.messageText)
        .then(() => {
          this.messageText = '';
        });
    }
  }


  autoGrow(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  openChat() {
    this.selectedChat = true;
  }

  closeChat() {
    this.selectedChat = false;
  }
}
