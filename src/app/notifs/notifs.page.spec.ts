import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifsPage } from './notifs.page';

describe('NotifsPage', () => {
  let component: NotifsPage;
  let fixture: ComponentFixture<NotifsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
