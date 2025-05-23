import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomListAvailPage } from './room-list-avail.page';

describe('RoomListAvailPage', () => {
  let component: RoomListAvailPage;
  let fixture: ComponentFixture<RoomListAvailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListAvailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
