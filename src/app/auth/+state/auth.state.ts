import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {Login, Logout} from "./auth.actions";

export interface AuthStateModel {
  isLoggedIn: boolean;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: false
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {
  }

  @Action(Login)
  async login(ctx: StateContext<AuthStateModel>) {
    await this.authService.login();
    ctx.patchState({isLoggedIn: true});
  }

  @Action(Logout)
  async logout(ctx: StateContext<AuthStateModel>) {
    await this.authService.logout();
    ctx.patchState({isLoggedIn: false});
  }
}
