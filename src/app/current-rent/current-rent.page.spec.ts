import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentRentPage } from './current-rent.page';

describe('CurrentRentPage', () => {
  let component: CurrentRentPage;
  let fixture: ComponentFixture<CurrentRentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
