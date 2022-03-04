import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkStackCategoryComponent } from './link-stack-category.component';

describe('LinkStackCategoryComponent', () => {
  let component: LinkStackCategoryComponent;
  let fixture: ComponentFixture<LinkStackCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkStackCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkStackCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
