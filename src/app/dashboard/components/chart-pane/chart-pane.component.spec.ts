import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPaneComponent } from './chart-pane.component';

describe('ChartPaneComponent', () => {
  let component: ChartPaneComponent;
  let fixture: ComponentFixture<ChartPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
