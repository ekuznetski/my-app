import {ChartingLibraryWidgetOptions} from "@assets/charting_library";
import {DashboardWidget} from "@app/dashboard/+state/dashboard.state";

export class AddSignalPane {
  static readonly type = '[Dashboard] AddSignalPane';
}

export class AddChartPane {
  static readonly type = '[Dashboard] AddChartPane';
  constructor(public payload: DashboardWidget) {
  }
}

export class ResizePane {
  static readonly type = '[Dashboard] ResizePane';
  constructor(public payload: DashboardWidget) {
  }
}

export class MovePane {
  static readonly type = '[Dashboard] MovePane';
  constructor(public payload: DashboardWidget) {
  }
}

export class AddLiquidationPane {
  static readonly type = '[Dashboard] AddLiquidationPane';
}

export class RemovePane {
  static readonly type = '[Dashboard] RemovePane';
  constructor(public payload: { id: string }) {}
}
