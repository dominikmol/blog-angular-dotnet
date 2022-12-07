import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';
import { Article } from '../../modules/article';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  public statuses: string[] = [
    'to Improve',
    'Published',
    'unChecked',
    'Approved',
  ];

  public article$: Article = {
    id: 0,
    title: '',
    author: '',
    content: '',
    articleStatus: '',
  };

  constructor(private myDataService: MyDataService, private router: Router) {}

  ngOnInit(): void {}

  submit() {
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
      this.article$.createdAt = currentDate;
      this.article$.updatedAt = currentDate;
      this.myDataService.addArticle(this.article$).subscribe(() => {
        this.router.navigate(['admin-panel']);
      });
    }
  }
}
