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

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        const userId = params['userId'];
        const userName = params['userName'];
        
        console.log('[USER] Messages loaded:', this.chatMessages);
        // Load chat messages for this userId here
      });

    this.afAuth.authState.subscribe(async user => {
      this.currentUser = user;
      if (user) {
        const allUsers = await this.firestoreService.getAllUsers();
        const current = allUsers.find(u => u.id === user.uid);
        this.userName = current ? `${current.firstname} ${current.lastname}` : user.email!;
      }
    });

    this.firestoreService.getChatMessages().subscribe(messages => {
      this.chatMessages = messages;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.currentUser) return;

    // 👇 Get the userId and userName from query params
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const userName = this.route.snapshot.queryParamMap.get('userName') || 'User';

    if (!userId) return;

    await this.firestoreService.sendChatMessage(
      userId,         // this will be joined with adminId inside the service
      userName,
      
      this.newMessage.trim()
      
    );
    this.newMessage = '';
    
  }


  scrollToBottom() {
    const content = document.querySelector('ion-content');
    if (content) (content as any).scrollToBottom(300);
  }
}
