import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteMemeComponent } from './delete-meme/delete-meme.component';
import { AddMemeComponent } from './add-meme/add-meme.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminPanelComponent, EditMemeComponent, DeleteMemeComponent, AddMemeComponent],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    CommonModule,
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    AdminPanelRoutingModule,
  ],
})
export class AdminPanelModule {}
