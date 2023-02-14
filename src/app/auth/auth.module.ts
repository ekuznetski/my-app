import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./+state/auth.state";
import {AuthService} from "./auth.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [AuthService],
})
export class AuthModule { }
