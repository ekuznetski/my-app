import {State} from "@ngxs/store";
import {Injectable} from "@angular/core";


export interface ProfileStateModel {
  name: string;
  email: string;

}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    name: '',
    email: ''
  }
})
@Injectable()
export class ProfileState {}
