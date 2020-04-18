import { AboutComponent } from './../about/about.component';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellAdminService } from '@app/shell-admin/shell-admin.service';
import { extract } from '@app/i18n';


const routes: Routes = [
  ShellAdminService.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin-panel', component: AdminPanelComponent, data: { title: extract('admin-panel') },
      children: [
        {path: 'add', component: AboutComponent}
      ]},
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
