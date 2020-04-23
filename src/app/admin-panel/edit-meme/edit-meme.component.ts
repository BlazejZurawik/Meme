import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminPanelServiceService } from '../admin-panel-service.service';

export interface DialogData {
  id: number;
  title: string;
  url: string;
  comment: string;
  tag: string;
}

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.scss'],
})
export class EditMemeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private service: AdminPanelServiceService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

    this.dialogRef.close();

    this.service.callComponentMethod('edit');

    this.service.editMeme(this.data.id, this.data.title, this.data.url, this.data.comment, this.data.tag).subscribe();
  }
}
