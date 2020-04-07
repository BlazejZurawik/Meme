import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {Clipboard} from '@angular/cdk/clipboard';
import { SearchServiceService } from '@app/search-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  myDate = new Date();
  meme: any;
  notScrolly = true;
  notEmptyPost = true;
  page = 1;

  constructor(
    private http: HttpClient,
    public spinner: NgxSpinnerService,
    private clipboard: Clipboard,
    private searchService: SearchServiceService) {

      this.searchService.componentMethodCalled$.subscribe( () => {
        this.searchMemeTrigger();
      })
    }

  coppyLink(id: number) {
    this.clipboard.copy(`localhost:4200/home/${id}`)
  }

  searchMemeTrigger() {
    this.ngOnInit();
  }

  searchMeme(tag: string) {
    return this.http.get(`http://localhost:3000/memes?_page=1&_sort=id&_order=desc&tags=${tag}`);
  }

  getMeme(): Observable<any> {
    return this.http.get(`http://localhost:3000/memes?_page=1&_sort=id&_order=desc`);
  }

  onScroll() {
    if (this.notScrolly && this.notEmptyPost) {
      this.spinner.show()
      this.notScrolly = false
      this.loadNextPost();
    }
  }

  loadNextPost() {
   this.page++

   setTimeout(() => {

    if(this.searchService.search === true) {
      this.http.get(`http://localhost:3000/memes?_page=${this.page}&_sort=id&_order=desc&tags=${this.searchService.value}`)
      .subscribe( (data: any) => {

         const newPost = data;

         this.spinner.hide();

         if (newPost.length === 0 ) {
           this.notEmptyPost =  false;
         }
         // add newly fetched posts to the existing post
         this.meme = this.meme.concat(newPost);

         this.notScrolly = true;
       });
    } else {

      this.http.get(`http://localhost:3000/memes?_page=${this.page}&_sort=id&_order=desc`)
      .subscribe( (data: any) => {

         const newPost = data;

         this.spinner.hide();

         if (newPost.length === 0 ) {
           this.notEmptyPost =  false;
         }
         // add newly fetched posts to the existing post
         this.meme = this.meme.concat(newPost);

         this.notScrolly = true;
       });
    }
   }, 1500);
  }

  ngOnInit() {

    if(this.searchService.search === true) {
      this.searchMeme(this.searchService.value).subscribe(data => {
        this.meme = data
        console.log(this.meme);
      });
    } else {
      this.getMeme().subscribe(data => {
        this.meme = data
        console.log(this.meme);
      });
    }
  }
}
