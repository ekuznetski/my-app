import {Component, Input} from '@angular/core';
import {DashboardWidget} from "@app/dashboard/+state/dashboard.state";
import {RemovePane} from "@app/dashboard/+state/dashboard.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-pane-header',
  templateUrl: './pane-header.component.html',
  styleUrls: ['./pane-header.component.css']
})
export class PaneHeaderComponent {
  @Input()
  item!: DashboardWidget
  grabClass: string = '';


  constructor(private store: Store) {
  }

  removeItem($event: MouseEvent | TouchEvent, item: DashboardWidget): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.store.dispatch(new RemovePane({id: item.id}));
  }
}
