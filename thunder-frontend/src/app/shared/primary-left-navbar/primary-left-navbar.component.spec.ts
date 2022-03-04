import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryLeftNavbarComponent } from './primary-left-navbar.component';

describe('PrimaryLeftNavbarComponent', () => {
  let component: PrimaryLeftNavbarComponent;
  let fixture: ComponentFixture<PrimaryLeftNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryLeftNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
