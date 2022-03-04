import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAddEditDialogComponent } from './link-add-edit-dialog.component';

describe('LinkAddEditDialogComponent', () => {
  let component: LinkAddEditDialogComponent;
  let fixture: ComponentFixture<LinkAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkAddEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
