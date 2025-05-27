import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-landlord-tenants',
  templateUrl: './landlord-tenants.page.html',
  styleUrls: ['./landlord-tenants.page.scss'],
})
export class LandlordTenantsPage implements OnInit {

  tenants = [
    {
      name: 'Maria Garcia',
      image: 'assets/john-doe.jpg',
      roomNumber: '101',
      buildingNumber: 'A',
      lastPaid: 'May 10, 2025',
      nextDue: 'June 10, 2025',
      attendedDate: 'March 1, 2024',
      address: '123 Maple Street',
      contact: '0917-123-4567'
    },
    {
      name: 'John Reyes',
      image: 'assets/john-doe.jpg',
      roomNumber: '204',
      buildingNumber: 'B',
      lastPaid: 'April 15, 2025',
      nextDue: 'May 15, 2025',
      attendedDate: 'January 10, 2024',
      address: '456 Oak Avenue',
      contact: '0918-987-6543'
    },
  ];

  approvalTenants = [
    {
      name: 'Anna Cruz',
      image: 'assets/john-doe.jpg',
      roomNumber: '305',
      buildingNumber: 'C',
      attendedDate: 'May 1, 2025',
      address: '789 Pine Road',
      contact: '0922-333-5555'
    },
    {
      name: 'Mark Villanueva',
      image: 'assets/john-doe.jpg',
      roomNumber: '110',
      buildingNumber: 'A',
      attendedDate: 'May 3, 2025',
      address: '246 Cedar Lane',
      contact: '0933-444-6666'
    }
  ];

  selectedTenant: any = null;
  approvalModalTenant: any = null;

  constructor() { }

  ngOnInit() { }

  openTenantModal(tenant: any) {
    this.selectedTenant = tenant;
  }

  closeTenantModal() {
    this.selectedTenant = null;
  }

  openApprovalModal(tenant: any, event: Event) {
    event.stopPropagation();
    this.approvalModalTenant = tenant;
  }

  closeApprovalModal() {
    this.approvalModalTenant = null;
  }

  // Approve, Decline, Remove functions are intentionally removed/disabled
}
