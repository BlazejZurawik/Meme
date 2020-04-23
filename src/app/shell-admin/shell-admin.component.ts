import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from '@app/@core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell-admin',
  templateUrl: './shell-admin.component.html',
  styleUrls: ['./shell-admin.component.scss'],
})
export class ShellAdminComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(private media: MediaObserver) {}

  ngOnInit() {
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some((change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')
        ),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
  }

  ngOnDestroy() {
    // Needed for automatic unsubscribe with untilDestroyed
  }
}
