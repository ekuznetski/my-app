import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneHeaderComponent } from './pane-header.component';

describe('PaneHeaderComponent', () => {
  let component: PaneHeaderComponent;
  let fixture: ComponentFixture<PaneHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaneHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaneHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
