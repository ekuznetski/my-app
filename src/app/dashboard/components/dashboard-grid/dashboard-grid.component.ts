import { Component, Input } from "@angular/core";
import { DashboardStateModel, DashboardWidget } from "@app/dashboard/+state/dashboard.state";
import { Select } from "@ngxs/store";
import { GridsterConfig } from "angular-gridster2";
import { Observable } from "rxjs";

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
      this.dashboard = value.currentLayout.widgets;
    });
  }
}
