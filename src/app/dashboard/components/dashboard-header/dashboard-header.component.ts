import { Component, Input } from '@angular/core';
import { Login, Logout } from '@app/auth/+state/auth.actions';
import { AuthState, AuthStateModel } from '@app/auth/+state/auth.state';
import {
  AddChartPane,
  AddLiquidationPane,
  AddSignalPane,
} from '@app/dashboard/+state/dashboard.actions';
import {
  DashboardWidget,
  PaneType,
} from '@app/dashboard/+state/dashboard.state';
import { Store } from '@ngxs/store';
import { GridsterConfig } from 'angular-gridster2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent {
  @Input()
  options!: GridsterConfig;
  auth$ = this.store.select<AuthStateModel>(AuthState);
  constructor(private store: Store) {}

  login() {
    this.store.dispatch(new Login());
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  addSignalPane() {
    this.store.dispatch(new AddSignalPane());
  }

  addChartPane() {
    const position = this.options.api?.getFirstPossiblePosition!({
      cols: 4,
      rows: 4,
      y: 0,
      x: 0,
    });

    const widget: DashboardWidget = {
      id: uuidv4(),
      cols: 4,
      rows: 4,
      y: position!.y,
      x: position!.x,
      color: 'red',
      type: PaneType.Chart,
      meta: {
        symbol: 'BTCUSDT',
        interval: '1',
      },
    };

    this.store.dispatch(new AddChartPane(widget));
  }

  addLiquidationPane() {
    this.store.dispatch(new AddLiquidationPane());
  }
}
