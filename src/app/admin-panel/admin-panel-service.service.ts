import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelServiceService {

  // Observable string sources
  public componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor() { }

    // Service message commands
    callComponentMethod(snackKind: string) {
      this.componentMethodCallSource.next(snackKind);
    }
}
