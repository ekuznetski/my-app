import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationsPaneComponent } from './liquidations-pane.component';

describe('LiquidationsPaneComponent', () => {
  let component: LiquidationsPaneComponent;
  let fixture: ComponentFixture<LiquidationsPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationsPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
