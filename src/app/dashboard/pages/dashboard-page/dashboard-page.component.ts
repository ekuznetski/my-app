import { Component } from "@angular/core";
import { LayoutService } from "@app/layout.service";
import { DisplayGrid, GridsterConfig, GridType } from "angular-gridster2";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  options!: GridsterConfig;

  constructor(private layoutService: LayoutService) {
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
          nw: false
        },
      },
      itemChangeCallback: (item, itemComponent) => {
        console.log('itemChangeCallback', item, itemComponent);
        this.layoutService.update(item)
      },
      itemResizeCallback: (item, itemComponent) => {
        console.log('itemResizeCallback', item, itemComponent);
        this.layoutService.update(item)
      },
      margin: 2,
      minCols: 8,
      minRows: 8
    };
  }
}
