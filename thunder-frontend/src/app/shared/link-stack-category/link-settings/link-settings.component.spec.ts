import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSettingsComponent } from './link-settings.component';

describe('LinkSettingsComponent', () => {
  let component: LinkSettingsComponent;
  let fixture: ComponentFixture<LinkSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
