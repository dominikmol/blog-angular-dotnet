import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';
import { Article } from '../../modules/article';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  public statuses: string[] = [
    'toImprove',
    'Published',
    'unChecked',
    'Approved',
  ];
  public editId?: string;
  public article$: Article = {
    id: 0,
    title: '',
    author: '',
    content: '',
    articleStatus: '',
  };

  constructor(
    private myDataService: MyDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.editId = params['editedId'];
      if (this.editId != undefined) {
        this.myDataService.getArticleById(this.editId).subscribe((data) => {
          this.article$ = data;
          console.log(this.article$);
        });
      } else {
        this.router.navigate(['add-article']);
      }
    });
  }

  updateArticle() {
    if (this.editId != undefined) {
      if (
        this.article$.articleStatus === '' ||
        this.article$.title === '' ||
        this.article$.content === '' ||
        this.article$.author === ''
      ) {
        alert('some of the fields are empty');
      } else {
        const currentDate = formatDate(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss',
          'en-US'
        );
        this.article$.updatedAt = currentDate;
        this.myDataService
          .updateArticle(this.editId, this.article$)
          .subscribe(() => {
            this.router.navigate(['admin-panel']);
          });
      }
    } else {
      alert('something went wrong with updating, please try again later');
    }
  }
}
