import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneBodyComponent } from './pane-body.component';

describe('PaneBodyComponent', () => {
  let component: PaneBodyComponent;
  let fixture: ComponentFixture<PaneBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaneBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaneBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
