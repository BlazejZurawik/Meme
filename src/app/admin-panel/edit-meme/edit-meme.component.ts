import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminPanelServiceService } from '../admin-panel-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  id: number;
  title: string;
  url: string;
  comments: string;
  tag: string;
}

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.scss'],
})
export class EditMemeComponent implements OnInit {

  editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private service: AdminPanelServiceService
  ) {

    this.createForm();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

    this.service.editMeme(this.data.id, this.editForm.value).subscribe();

    this.dialogRef.close();
    this.service.callComponentMethod('edit');

  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      title: new FormControl(this.data.title, { validators: [Validators.required] }),
      url: new FormControl(this.data.url, { validators: [Validators.required] }),
      comments: new FormControl(this.data.comments),
      tags: new FormControl(this.data.tag, { validators: [Validators.required] }),
    });
  }
}
