import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { AdminPanelServiceService } from '../admin-panel-service.service';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.scss']
})
export class AddMemeComponent implements OnInit {
  data: string;
  title: string;
  url: string;
  comment: string;
  tag: string;

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    private service: AdminPanelServiceService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.http.post(`http://localhost:3000/memes`, {
        title: this.title,
        url: this.url,
        comment: this.comment,
        tags: this.tag
    }, {headers: new HttpHeaders({'Content-Type': 'application/json'})
    } ).subscribe();

    this.dialogRef.close();

    this.service.callComponentMethod('add');
  }

}
