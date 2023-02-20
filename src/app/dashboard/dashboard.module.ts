import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GridsterModule } from 'angular-gridster2';
import { NgxColorsModule } from 'ngx-colors';
import { DashboardState } from './+state/dashboard.state';
import { ChartPaneComponent } from './components/chart-pane/chart-pane.component';
import { TvChartContainerComponent } from './components/chart-pane/tv-chart-container/tv-chart-container.component';
import { DashboardGridComponent } from './components/dashboard-grid/dashboard-grid.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { LiquidationsPaneComponent } from './components/liquidations-pane/liquidations-pane.component';
import { PaneBodyComponent } from './components/pane/pane-body/pane-body.component';
import { PaneHeaderComponent } from './components/pane/pane-header/pane-header.component';
import { PaneComponent } from './components/pane/pane.component';
import { SignalPaneComponent } from './components/signal-pane/signal-pane.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardHeaderComponent,
    DashboardGridComponent,
    PaneComponent,
    ChartPaneComponent,
    SignalPaneComponent,
    LiquidationsPaneComponent,
    PaneHeaderComponent,
    PaneBodyComponent,
    TvChartContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([DashboardState]),
    GridsterModule,
    NgxColorsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
