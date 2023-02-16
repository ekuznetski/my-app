import {Component, Input, OnInit} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from "angular-gridster2";
import {AppStateModel, DashboardStateModel, DashboardWidget, PaneType} from "@app/dashboard/+state/dashboard.state";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {RemovePane} from '@app/dashboard/+state/dashboard.actions';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css']
})
export class DashboardGridComponent {
  @Select() dashboard$!: Observable<DashboardStateModel>;
  @Input()
  options!: GridsterConfig;
  dashboard!: Array<DashboardWidget>;

  trackByFn(index: number, item: DashboardWidget) {
    return item.cols + item.rows + item.x + item.y;
  }

  constructor(private store: Store) {
    this.dashboard$.subscribe(dashboard => {
      this.dashboard = _.cloneDeep(dashboard.currentLayout.widgets);
    })
    // this.dashboard
  }
}
