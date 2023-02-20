import { Component, Input } from '@angular/core';
import {
  DashboardStateModel,
  DashboardWidget,
} from '@app/dashboard/+state/dashboard.state';
import { Select } from '@ngxs/store';
import { GridsterConfig } from 'angular-gridster2';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css'],
})
export class DashboardGridComponent {
  @Select() dashboard$!: Observable<DashboardStateModel>;
  @Input()
  options!: GridsterConfig;
  dashboard!: Array<DashboardWidget>;

  constructor() {
    this.dashboard$.subscribe((value) => {
      value.currentLayout.widgets.forEach((widget) => {
        widget['resizeEvent$'] = new Subject<boolean>();
        widget['dragEvent$'] = new Subject<boolean>();
        return widget;
      });
      this.dashboard = value.currentLayout.widgets;
    });
  }
}
