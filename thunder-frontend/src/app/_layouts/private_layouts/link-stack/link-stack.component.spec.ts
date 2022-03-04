import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkStackComponent } from './link-stack.component';

describe('LinkStackComponent', () => {
  let component: LinkStackComponent;
  let fixture: ComponentFixture<LinkStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
