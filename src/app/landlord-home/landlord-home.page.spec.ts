import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandlordHomePage } from './landlord-home.page';

describe('LandlordHomePage', () => {
  let component: LandlordHomePage;
  let fixture: ComponentFixture<LandlordHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
