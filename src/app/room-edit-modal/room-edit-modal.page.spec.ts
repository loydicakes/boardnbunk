import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomEditModalPage } from './room-edit-modal.page';

describe('RoomEditModalPage', () => {
  let component: RoomEditModalPage;
  let fixture: ComponentFixture<RoomEditModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
