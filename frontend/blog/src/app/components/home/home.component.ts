import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MyDataService } from '../../services/my-data.service';
import { Article } from '../../modules/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public articles$: Article[] = [];

  constructor(private myDataService: MyDataService) {}

  ngOnInit(): void {
    this.myDataService
      .getPublishedArticles()
      .pipe(take(1))
      .subscribe((data) => {
        this.articles$ = data;
      });
  }
}
