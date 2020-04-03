import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private http: HttpClient, public spinner: NgxSpinnerService) {}

  getMeme(): Observable<any> {
    // return this.http.get(`http://localhost:3000/memes`);
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
   }, 1500);

  }

  ngOnInit() {
    this.getMeme().subscribe(data => {
      this.meme = data
      console.log(this.meme);
    });

    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
  }
}
