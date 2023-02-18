import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DashboardStateModel, DashboardWidget } from "@app/dashboard/+state/dashboard.state";
import { Select } from "@ngxs/store";
import { GridsterConfig } from "angular-gridster2";
import * as _ from "lodash";
import { Observable } from "rxjs";

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardGridComponent {
  @Select() dashboard$!: Observable<DashboardStateModel>;
  @Input()
  options!: GridsterConfig;
  dashboard!: Array<DashboardWidget>;

  trackByFn(index: number, item: DashboardWidget) {
    return item.cols + item.rows + item.x + item.y;
  }

  constructor() {
    this.dashboard$.subscribe((value) => {
      console.log(value?.currentLayout?.widgets?.length, this.dashboard?.length);
      if (
        value &&
        value?.currentLayout?.widgets?.length !== this.dashboard?.length
      ) {
        this.dashboard = [..._.cloneDeep(value.currentLayout.widgets)];
      }
    });
  }
}
