import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifs',
  templateUrl: './notifs.page.html',
  styleUrls: ['./notifs.page.scss'],
  standalone: false,
})
export class NotifsPage {
  notifications = [
    {
      title: 'Room Booked Successfully',
      message: 'Your booking for the C1 Room is confirmed. You are officially a tenant of BNB!',
      time: '5:00 pm',
      read: false,
    },
    {
      title: 'Payment Confirmed',
      message: 'Your payment of $250 has been successfully processed.',
      time: '4:52 pm',
      read: true,
    },
  ];

}

