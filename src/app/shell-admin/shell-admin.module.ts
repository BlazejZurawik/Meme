import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellAdminComponent } from './shell-admin.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '@app/auth';
import { I18nModule } from '@app/i18n';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ShellAdminComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AuthModule,
    I18nModule,
    // InfiniteScrollModule,
    // NgxSpinnerModule,
    RouterModule,
  ]
})
export class ShellAdminModule { }
