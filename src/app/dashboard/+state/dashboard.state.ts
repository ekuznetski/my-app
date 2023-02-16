import {Injectable} from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import {GridsterItem} from "angular-gridster2";
import {AddChartPane, MovePane, RemovePane, ResizePane} from "@app/dashboard/+state/dashboard.actions";
import produce from "immer";
import {v4 as uuidv4} from 'uuid';
import {AuthState, AuthStateModel} from "@app/auth/+state/auth.state";
import {ProfileStateModel} from "@app/profile/+state/profile.state";
import _ from 'lodash';
export enum PaneType {
  Default,
  Signal,
  Chart,
  Liquidations,
  Positions,
  Orders,
}
export interface DashboardWidget extends GridsterItem {
  id: string;
  color: string;
  type: PaneType;
  meta: {
    symbol?: any;
    interval?: any;
  };
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
}


export interface AppStateModel {
  auth: AuthStateModel;
  dashboard: DashboardStateModel;
  profile: ProfileStateModel;
}

export interface DashboardStateModel {
  currentLayout: DashboardLayout;
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    currentLayout: {
      id: '1',
      name: 'Default',
      widgets: [
        {
          cols: 4,
          rows: 4,
          y: 0,
          x: 0,
          id: uuidv4(),
          color: 'red',
          type: PaneType.Chart,
          meta: {
            symbol: 'BTCUSDT',
            interval: '1'
          }
        },
        {
          cols: 4,
          rows: 4,
          y: 0,
          x: 4,
          id: uuidv4(),
          color: 'red',
          type: PaneType.Chart,
          meta: {
            symbol: 'ETHUSDT',
            interval: '1'
          }
        },
      ]
    }
  }
})
@Injectable()
export class DashboardState {
  constructor() {}

  @Action(AddChartPane)
  addChartPane({getState, patchState}: any, {payload}: AddChartPane) {
    const state = getState();
    patchState({
      currentLayout: {
        ...state.currentLayout,
        widgets: [...state.currentLayout.widgets, payload]
      }
    })
  }

  @Action(RemovePane)
  removePane({getState, patchState}: StateContext<DashboardStateModel>, {payload}: RemovePane) {
    const state = getState();

    // patchState({
    //   currentLayout: {
    //     ...state.currentLayout,
    //     widgets: state.currentLayout.widgets.filter((widget: { id: string; }) => widget.id !== payload.id)
    //   }
    // })
  }

  @Action(ResizePane)
  resizePane({setState}: StateContext<DashboardStateModel>, {payload}: ResizePane) {
    setState(produce(draft => {
      const widgetIdx = draft.currentLayout.widgets.findIndex((widget: { id: string; }) => widget.id === payload.id);
      if(widgetIdx === -1) return;
      if(_.isEqual(draft.currentLayout.widgets[widgetIdx], payload)) return;
      draft.currentLayout.widgets[widgetIdx].cols = payload.cols;
      draft.currentLayout.widgets[widgetIdx].rows = payload.rows;
    } ))
  }

  @Action(MovePane)
  movePane({setState}: StateContext<DashboardStateModel>, {payload}: ResizePane) {
    setState(produce(draft => {
      const widgetIdx = draft.currentLayout.widgets.findIndex((widget: { id: string; }) => widget.id === payload.id);
      if(widgetIdx === -1) return;
      if(_.isEqual(draft.currentLayout.widgets[widgetIdx], payload)) return;
      draft.currentLayout.widgets[widgetIdx].x = payload.x;
      draft.currentLayout.widgets[widgetIdx].y = payload.y;
    }))
  }

}
