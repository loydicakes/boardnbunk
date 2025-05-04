import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: false,
})
export class MessagePage implements AfterViewInit {
  selectedChat: string | null = null;
  messageText: string = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  openChat(name: string) {
    this.selectedChat = name;
    setTimeout(() => this.scrollToBottom(), 100); // Scroll to bottom on open
  }

  closeChat() {
    this.selectedChat = null;
  }

  autoGrow(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    setTimeout(() => this.scrollToBottom(), 100); // Keep scroll at bottom while typing
  }

  sendMessage() {
    if (this.messageText.trim().length === 0) {
      return;
    }
    // In real app, you would push message to conversation here
    // For demo, we just clear input
    this.messageText = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  scrollToBottom() {
    try {
      if (this.messagesContainer && this.messagesContainer.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Failed to scroll to bottom', err);
    }
  }

  ngAfterViewInit() {
    // Scroll to bottom initially if chat is open
    if (this.selectedChat) {
      this.scrollToBottom();
    }
  }
}
