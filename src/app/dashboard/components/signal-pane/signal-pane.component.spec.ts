import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalPaneComponent } from './signal-pane.component';

describe('SignalPaneComponent', () => {
  let component: SignalPaneComponent;
  let fixture: ComponentFixture<SignalPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
