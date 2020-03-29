import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // quote: string | undefined;
  isLoading = false;

  meme: any;

  constructor(private http: HttpClient) {}

  getMeme(): Observable<any> {
    return this.http.get(`http://localhost:3000/memes`);
  }

  ngOnInit() {
    this.isLoading = true;

    this.getMeme().subscribe(data => {
      this.meme = data
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
