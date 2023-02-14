import {Component, Input, OnInit} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from "angular-gridster2";
import {AppStateModel, DashboardStateModel, DashboardWidget, PaneType} from "@app/dashboard/+state/dashboard.state";
import {v4 as uuidv4} from "uuid";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {RemovePane} from '@app/dashboard/+state/dashboard.actions';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css']
})
export class DashboardGridComponent implements OnInit {
  @Select() dashboard$!: Observable<DashboardStateModel>;
  @Input()
  options!: GridsterConfig;
  dashboard!: Array<DashboardWidget>;



  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.dashboard$.subscribe((dashboard) => {
      console.log(dashboard);
      this.dashboard = dashboard.currentLayout.widgets.map((item) => ({
        ...item,
        resizeEvent$: new Subject<boolean>(),
        dragEvent$: new Subject<boolean>(),
      }));
    });

  }


}
