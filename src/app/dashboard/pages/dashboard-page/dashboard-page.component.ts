import { Component } from '@angular/core';
import { MovePane, ResizePane } from '@app/dashboard/+state/dashboard.actions';
import { DashboardWidget } from '@app/dashboard/+state/dashboard.state';
import { Store } from '@ngxs/store';
import { DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  options!: GridsterConfig;

  constructor(private store: Store) {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      pushItems: true,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
        handles: {
          s: false,
          e: false,
          n: false,
          w: false,
          se: true,
          ne: false,
          sw: true,
          nw: false,
        },
      },
      itemChangeCallback: (item, itemComponent) => {
        console.log('itemChangeCallback', item, itemComponent);
        this.store.dispatch(new MovePane(item as DashboardWidget));
      },
      itemResizeCallback: (item, itemComponent) => {
        console.log('itemResizeCallback', item, itemComponent);
        this.store.dispatch(new ResizePane(item as DashboardWidget));
      },
      margin: 2,
      minCols: 8,
      minRows: 8,
    };
  }
}
