import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { AdminPanelServiceService } from '../admin-panel-service.service';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.scss'],
})
export class AddMemeComponent implements OnInit {
  data: string;
  title: string;
  url: string;
  comment: string;
  tag: string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    private service: AdminPanelServiceService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();

    this.service.callComponentMethod('add');

    this.service.addMeme(this.title, this.url, this.comment, this.tag).subscribe();
  }
}
