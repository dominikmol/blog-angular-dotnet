import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MyDataService } from '../../services/my-data.service';
import { Article } from '../../modules/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public articles$: Article[] = [];
  public displayedColumns: string[] = [
    'id',
    'title',
    'content',
    'articleStatus',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  constructor(private myDataService: MyDataService, private router: Router) {}

  ngOnInit(): void {
    this.myDataService
      .getAllArticles()
      .pipe(take(1))
      .subscribe((data) => {
        this.articles$ = data;
      });
  }

  addArticlePage(pageName: string): void {
    this.router.navigate([pageName]);
  }

  editArticle(id: string): void {
    this.router.navigate(['edit-article'], {
      queryParams: { editedId: id },
    });
  }

  deleteArticle(id: string): void {
    this.myDataService.deleteArticleById(id).subscribe(() => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    });
  }
}
