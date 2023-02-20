import { Component, Input } from '@angular/core';
import { DashboardWidget } from '@app/dashboard/+state/dashboard.state';

@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.css'],
})
export class PaneComponent {
  @Input()
  item!: DashboardWidget;
}
