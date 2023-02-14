import { Component, Input } from "@angular/core";
import { DashboardWidget } from "@app/dashboard/+state/dashboard.state";
import { LayoutService } from "@app/layout.service";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-pane-header',
  templateUrl: './pane-header.component.html',
  styleUrls: ['./pane-header.component.css']
})
export class PaneHeaderComponent {
  @Input()
  item!: DashboardWidget
  grabClass: string = '';


  constructor(private store: Store, private layoutService: LayoutService) {
  }

  removeItem($event: MouseEvent | TouchEvent, item: DashboardWidget): void {
    $event.preventDefault();
    $event.stopPropagation();
     this.layoutService.remove(item);
  }
}
