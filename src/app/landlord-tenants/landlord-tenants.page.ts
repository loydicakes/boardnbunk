import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { arrayUnion } from '@angular/fire/firestore';

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
  ) {}

  async ngOnInit() {
    await this.loadApprovalRequests();
    await this.loadCurrentTenants();
  }

  getLastDayOfNextMonth(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 2;
    return new Date(year, month, 0);
  }

  async loadApprovalRequests() {
    const snapshot = await this.firestoreService.getCollection('request');
    this.approvalTenants = snapshot.map((doc: any) => ({
      id: doc.id,
      name: doc.name || 'No Name',
      image: doc.image || 'assets/1.jpg',
      roomName: doc.roomName || 'N/A',
      roomType: doc.roomType || 'N/A',
      datentime: doc.datentime || null,
      userId: doc.userId || '',
      paymentMethod: doc.paymentMethod || 'Not Set'
    }));
  }

  async loadCurrentTenants() {
    const tenants = await this.firestoreService.getCollection('tenants');
    this.tenants = tenants.map((t: any) => ({
      id: t.id,
      name: t.name,
      image: t.image || 'assets/img/default-user.png',
      roomName: t.roomName || 'N/A',
      roomType: t.roomType || 'N/A',
      lastPaid: t.lastPaid,
      nextDue: t.nextDue,
      paymentMethod: t.paymentMethod || 'Not Set'
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

  async approveTenant(id: string) {
    const tenant = this.approvalTenants.find(t => t.id === id);
    if (!tenant) return;

    const now = new Date();
    const nextDue = new Date(now);
    nextDue.setMonth(nextDue.getMonth() + 1);

    const fullName = tenant.name;

    const approvedData = {
      name: fullName,
      userId: tenant.userId,
      image: tenant.image || 'assets/img/default-user.png',
      roomName: tenant.roomName || 'N/A',
      roomType: tenant.roomType || 'N/A',
      paymentMethod: tenant.paymentMethod || 'Not Set',
      approvedDate: now,
      paymentStatus: false,
      lastPaid: null,
      nextDue: nextDue
    };

    await this.firestoreService.addDocument('tenants', approvedData);

    const rooms = await this.firestoreService.getCollection('room');
    const matchedRoom = rooms.find((r: any) => r.name === tenant.roomName);

    if (matchedRoom) {
      const updatedTenantList = Array.isArray(matchedRoom.tenants)
        ? [...matchedRoom.tenants, fullName]
        : [fullName];

      await this.firestoreService.updateDocument('room', matchedRoom.id, {
        tenants: updatedTenantList
      });
    }

    await this.firestoreService.updateDocument('users', tenant.userId, {
      notifications: arrayUnion({
        message: 'Request Approved',
        timestamp: new Date(),
        read: false
      })
    });

    await this.firestoreService.deleteDocument('request', id);
    this.approvalTenants = this.approvalTenants.filter(t => t.id !== id);
    this.closeApprovalModal();
  }
<<<<<<< HEAD
  
=======

>>>>>>> 310c5737b6d837dd405f9d5199823271478eb07d
  openChat(tenant: any) {
    this.router.navigate(['/chat'], {
      queryParams: {
        userId: tenant.id,
        userName: tenant.name
      }
    });
  }
}
