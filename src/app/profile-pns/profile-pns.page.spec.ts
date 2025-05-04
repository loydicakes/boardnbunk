import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePnsPage } from './profile-pns.page';

describe('ProfilePnsPage', () => {
  let component: ProfilePnsPage;
  let fixture: ComponentFixture<ProfilePnsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
