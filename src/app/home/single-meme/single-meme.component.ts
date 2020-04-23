import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-meme',
  templateUrl: './single-meme.component.html',
  styleUrls: ['./single-meme.component.scss'],
})
export class SingleMemeComponent implements OnInit {
  myDate = new Date();
  meme: any;
  memeId: any;
  // memeId = 2

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getMeme(): Observable<any> {
    return this.http.get(`http://localhost:3000/memes?id=${this.memeId}`);
  }

  ngOnInit() {
    this.memeId = this.route.snapshot.paramMap.get('id');
    console.log('to meme id: ', this.memeId);

    this.getMeme().subscribe((data) => {
      this.meme = data[0];
      console.log(this.meme);
    });
  }
}
