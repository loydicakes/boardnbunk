import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandlordTenantsPage } from './landlord-tenants.page';

describe('LandlordTenantsPage', () => {
  let component: LandlordTenantsPage;
  let fixture: ComponentFixture<LandlordTenantsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordTenantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
