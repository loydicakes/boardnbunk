import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandlordProfilePage } from './landlord-profile.page';

describe('LandlordProfilePage', () => {
  let component: LandlordProfilePage;
  let fixture: ComponentFixture<LandlordProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
