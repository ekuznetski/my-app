import { Component, Input } from '@angular/core';
import { DashboardWidget } from '@app/dashboard/+state/dashboard.state';

@Component({
  selector: 'app-chart-pane',
  templateUrl: './chart-pane.component.html',
  styleUrls: ['./chart-pane.component.css'],
})
export class ChartPaneComponent {
  @Input()
  item!: DashboardWidget;

  constructor() {}
}
