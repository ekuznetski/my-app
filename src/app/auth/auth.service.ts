import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login() {
    return of(true);
  }

  logout() {
    return of(true);
  }
}
