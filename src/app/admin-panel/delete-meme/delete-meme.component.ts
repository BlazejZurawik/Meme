import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminPanelComponent } from '../admin-panel.component';
import { AdminPanelServiceService } from '../admin-panel-service.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-meme',
  templateUrl: './delete-meme.component.html',
  styleUrls: ['./delete-meme.component.scss'],
})
export class DeleteMemeComponent implements OnInit {
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
    // this.http.delete(`http://localhost:3000/memes/${this.data.id}`).subscribe();

    this.dialogRef.close();

    this.service.callComponentMethod('delete');

    this.service.deleteMeme(this.data.id).subscribe();
  }
}
