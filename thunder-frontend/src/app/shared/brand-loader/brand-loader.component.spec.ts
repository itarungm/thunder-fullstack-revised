import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLoaderComponent } from './brand-loader.component';

describe('BrandLoaderComponent', () => {
  let component: BrandLoaderComponent;
  let fixture: ComponentFixture<BrandLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
