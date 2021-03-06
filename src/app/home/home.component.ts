import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Clipboard } from '@angular/cdk/clipboard';
import { SearchServiceService } from '@app/search-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myDate = new Date();
  meme: any;
  tags: any;
  notScrolly = true;
  notEmptyPost = true;
  page = 1;

  constructor(
    private http: HttpClient,
    public spinner: NgxSpinnerService,
    private clipboard: Clipboard,
    private searchService: SearchServiceService,
    private _snackBar: MatSnackBar
  ) {
    this.searchService.componentMethodCalled$.subscribe(() => {
      this.searchMemeTrigger();
    });
  }

  coppyLink(url: string) {
    // this.clipboard.copy(`localhost:4200/home/${id}`);
    // this.openSnackBar('Meme link coppied')
    this.clipboard.copy(url);
    this.openSnackBar('Url link coppied');
  }

  coppyUrl(url: string) {
    window.open(url);
  }

  searchMemeTrigger() {
    this.ngOnInit();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Undo', { duration: 1000 });
  }

  searchMeme(tag: string): Observable<any> {
    return this.http.get(`api/searchMeme/${tag}?page=${this.page}`);
  }

  getMeme(): Observable<any> {
    // return this.http.get(`http://localhost:3000/memes?_page=1&_sort=id&_order=desc`);
    return this.http.get(`api/allMemesDesc`);
  }

  onScroll() {
    if (this.notScrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notScrolly = false;
      this.loadNextPost();
    }
  }

  loadNextPost() {
    this.page++;

    setTimeout(() => {
      if (this.searchService.search === true) {
        this.http.get(`api/searchMeme/${this.searchService.value}?page=${this.page}`).subscribe((data: any) => {
          const newPost = data.data;

          this.spinner.hide();

          if (newPost.length === 0) {
            this.notEmptyPost = false;
          }
          // add newly fetched posts to the existing post
          this.meme = this.meme.concat(newPost);

          this.notScrolly = true;
        });
      } else {
        this.http.get(`api/allMemesDesc?page=${this.page}`).subscribe((data: any) => {
          const newPost = data.data;

          this.spinner.hide();

          if (newPost.length === 0) {
            this.notEmptyPost = false;
          }
          // add newly fetched posts to the existing post
          this.meme = this.meme.concat(newPost);

          this.notScrolly = true;
        });
      }
    }, 1500);
  }

  ngOnInit() {
    if (this.searchService.search === true) {
      this.searchMeme(this.searchService.value).subscribe((data) => {
        this.meme = data.data;
      });
    } else {
      this.getMeme().subscribe((data) => {
        this.meme = data.data;
      });
    }
  }
}
