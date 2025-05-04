import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePmPage } from './profile-pm.page';

describe('ProfilePmPage', () => {
  let component: ProfilePmPage;
  let fixture: ComponentFixture<ProfilePmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
