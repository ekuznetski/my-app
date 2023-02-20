import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ChangePaneColor,
  RemovePane,
} from '@app/dashboard/+state/dashboard.actions';
import { DashboardWidget } from '@app/dashboard/+state/dashboard.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-pane-header',
  templateUrl: './pane-header.component.html',
  styleUrls: ['./pane-header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaneHeaderComponent implements OnInit {
  @Input()
  item!: DashboardWidget;
  grabClass: string = '';
  colorPalette = [
    '#524632',
    '#8f7e4f',
    '#c3c49e',
    '#d8ffdd',
    '#dedbd8',
    '#aedbd8',
  ];
  selectedColor!: string;
  constructor(private store: Store) {}

  ngOnInit() {
    if (this.item.color) {
      this.selectedColor = this.item.color;
    }
  }

  changeColor(color: string) {
    if (this.selectedColor) {
      this.store.dispatch(new ChangePaneColor({ ...this.item, color }));
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: DashboardWidget): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.store.dispatch(new RemovePane({ id: item.id }));
  }
}
