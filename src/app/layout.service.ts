import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private data$ = new BehaviorSubject<any[] | null>(null);
  private localStorageKey = 'layout';

  constructor() {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      this.data$.next(JSON.parse(savedData));
    }
  }

  get value(): any[] | null {
    return this.data$.value;
  }

  private saveToLocalStorage() {
    const currentValue = this.data$.value;
    if (currentValue) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(currentValue));
    }
  }

  add(data: any) {
    const currentValue = this.data$.value;
    this.data$.next([...(currentValue??[]), data]);
    this.saveToLocalStorage();
  }

  remove(data: any) {
    const currentValue = this.data$.value;
    this.data$.next(currentValue?.filter((item) => item !== data) ?? []);
    this.saveToLocalStorage();
  }

  update(data: any) {
    const currentValue = this.data$.value;
    this.data$.next(currentValue?.map((item) => item === data ? data : item) ?? []);
    this.saveToLocalStorage();
  }

  get valueChanges(): Observable<any[] | null > {
    return this.data$.asObservable();
  }
}

