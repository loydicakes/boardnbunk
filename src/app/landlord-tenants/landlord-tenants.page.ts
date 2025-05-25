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
    // Add more tenant objects as needed
  ];

  selectedTenant: any = null;

  constructor() { }

  ngOnInit() { }

  openTenantModal(tenant: any) {
    this.selectedTenant = tenant;
  }

  closeTenantModal() {
    this.selectedTenant = null;
  }
}
