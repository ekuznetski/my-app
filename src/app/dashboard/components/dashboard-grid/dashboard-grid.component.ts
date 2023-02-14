import { Component, Input } from "@angular/core";
import { DashboardStateModel, DashboardWidget } from "@app/dashboard/+state/dashboard.state";
import { LayoutService } from "@app/layout.service";
import { Select } from "@ngxs/store";
import { GridsterConfig } from "angular-gridster2";
import { Observable } from "rxjs";

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



  constructor(private layoutService: LayoutService) {
    layoutService.valueChanges.subscribe((value) => {
      if(value) this.dashboard = value;
    });
  }



}
