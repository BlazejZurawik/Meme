import { ShellAdminService } from './../shell-admin/shell-admin.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { AboutComponent } from './about.component';

const routes: Routes = [
  ShellAdminService.childRoutes([{ path: 'about', component: AboutComponent, data: { title: extract('About') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AboutRoutingModule {}
