import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-landlord-tenants',
  templateUrl: './landlord-tenants.page.html',
  styleUrls: ['./landlord-tenants.page.scss'],
})
export class LandlordTenantsPage implements OnInit {
  tenants: any[] = [];
  approvalTenants: any[] = [];
  selectedTenant: any = null;
  approvalModalTenant: any = null;

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadApprovalRequests();
    await this.loadCurrentTenants();
  }

  async loadApprovalRequests() {
  const snapshot = await this.firestoreService.getCollection('request');
  console.log('[Approval Snapshot]', snapshot); // debug log

  this.approvalTenants = snapshot.map((doc: any) => ({
    id: doc.id,
    name: doc.name || 'No Name',
    image: doc.image || 'assets/1.jpg',
    roomName: doc.roomName || 'N/A',
    roomType: doc.roomType || 'N/A',
    datentime: doc.datentime || null,
    paymentMethod: doc.paymentMethod || 'Not Set' // ✅ Added this line
  }));
}

  async loadCurrentTenants() {
    const tenants = await this.firestoreService.getCollection('tenants');
    this.tenants = tenants.map((t: any) => ({
      id: t.id,
      name: t.name,
      image: t.image || 'assets/img/default-user.png',
      roomNumber: t.roomNumber,
      buildingNumber: t.buildingNumber,
      lastPaid: t.lastPaid,
      nextDue: t.nextDue
    }));
  }

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


  async declineTenant(id: string) {
    await this.firestoreService.deleteDocument('request', id);
    this.approvalTenants = this.approvalTenants.filter(t => t.id !== id);
  }

  openChat(tenant: any) {
    this.router.navigate(['/chat'], {
      queryParams: {
        userId: tenant.id,
        userName: tenant.name
      }
    });
  }
}
