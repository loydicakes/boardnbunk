import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomUnavailableListPage } from './room-unavailable-list.page';

describe('RoomUnavailableListPage', () => {
  let component: RoomUnavailableListPage;
  let fixture: ComponentFixture<RoomUnavailableListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUnavailableListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
