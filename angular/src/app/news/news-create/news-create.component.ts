import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../news.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { News } from '../news.model';
import { mimeType } from './file-type.validator';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  news: News;
  imagePreview: string;
  isLoading = false;
  private mode = 'create';
  private newsId: string;
  form: FormGroup;
  constructor(public newsService: NewsService, public route: ActivatedRoute) {}
  onSaveNews() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.newsService.addNews(
        this.form.value.category,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.newsService.updateNews(
        this.newsId,
        this.form.value.category,
        this.form.value.content,
        this.form.value.image
      );
    }

    this.form.reset();
  }
  // image picker
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: mimeType
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('newsId')) {
        this.mode = 'edit';
        this.newsId = paramMap.get('newsId');
        this.isLoading = true;
        this.newsService.getTheNews(this.newsId).subscribe(newsData => {
          this.isLoading = false;
          this.news = {
            id: newsData._id,
            category: newsData.category,
            content: newsData.content,
            imagePath: newsData.imagePath
          };
          this.form.setValue({
            category: this.news.category,
            content: this.news.content,
            image: this.news.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.newsId = null;
      }
    });
  }
}
