import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  tag: string;
  search = false;
  value: string;

  // Observable string sources
  public componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor() {}

  // Service message commands
  callComponentMethod() {
    if (this.value === '' || this.value === undefined) {
      this.search = false;
    } else {
      this.search = true;
    }

    this.componentMethodCallSource.next();
  }
}
