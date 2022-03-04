import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ThunderRootComponent } from './thunder-root.component';

describe('ThunderRootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ThunderRootComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ThunderRootComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'thunder'`, () => {
    const fixture = TestBed.createComponent(ThunderRootComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('thunder');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ThunderRootComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('thunder app is running!');
  });
});
