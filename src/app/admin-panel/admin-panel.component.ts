import { DeleteMemeComponent } from './delete-meme/delete-meme.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { AdminPanelServiceService } from './admin-panel-service.service';
import { AddMemeComponent } from './add-meme/add-meme.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'url', 'comment', 'tags', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  memeInfo: any;
  spinnerBool: true;
  // snackKind: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private service: AdminPanelServiceService,
    public spinner: NgxSpinnerService
  ) {
    this.service.componentMethodCalled$.subscribe((result) => {
      if (result === 'edit') {
        this.openSnackBar('Record changed');
      } else if (result === 'delete') {
        this.openSnackBar('Record deleted');
      } else if (result === 'add') {
        this.openSnackBar('Record added');
      }

      this.spinner.show();

      setTimeout(() => {
        this.refreshTable();
      }, 250);
    });
  }

  refreshTable() {
    this.ngOnInit();
  }

  getMeme(): Observable<any> {
    // return this.http.get(`http://localhost:3000/memes?_sort=id&_order=asc`);
    return this.http.get(`api/admin/allMemes`)
  }

  coppyLink(url: string) {
    this.clipboard.copy(url);
    this.openSnackBar('Url link coppied');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Undo', { duration: 2000 });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EditMemeComponent, {
      width: '500px',
      data: {
        id: this.memeInfo[id].id,
        title: this.memeInfo[id].title,
        url: this.memeInfo[id].url,
        comments: this.memeInfo[id].comments,
        tag: this.memeInfo[id].tags,
      },
    });

    console.log('id: ', id);

    dialogRef.afterClosed().subscribe((result) => {
      // this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteMemeComponent, {
      width: '500px',
      data: { id: this.memeInfo[id].id },
    });

    console.log('id-del: ', id);

    dialogRef.afterClosed().subscribe((result) => {
      // this.ngOnInit();
      // this.refreshTable();
      console.log('The dialog was closed');
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddMemeComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.ngOnInit();
      // this.refreshTable();
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.service.getMemes().subscribe((data) => {
      this.memeInfo = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    });
  }
}
