import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { AdminPanelServiceService } from '../admin-panel-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  title: string;
  url: string;
  comments: string;
  tag: string;
}

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.scss'],
})
export class AddMemeComponent implements OnInit {
  // data: string;
  // title: string;
  // url: string;
  // comment: string;
  // tag: string;

  addForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    private service: AdminPanelServiceService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.service.addMeme(this.addForm.value).subscribe();

    this.dialogRef.close();

    this.service.callComponentMethod('add');

  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      title: new FormControl('', { validators: [Validators.required] }),
      url: new FormControl('', { validators: [Validators.required] }),
      comments: new FormControl(''),
      tags: new FormControl('', { validators: [Validators.required] }),
    });
  }
}
