import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavesPage } from './faves.page';

describe('FavesPage', () => {
  let component: FavesPage;
  let fixture: ComponentFixture<FavesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
