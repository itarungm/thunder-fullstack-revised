import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileProfileComponent } from './file-profile.component';

describe('FileProfileComponent', () => {
  let component: FileProfileComponent;
  let fixture: ComponentFixture<FileProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
