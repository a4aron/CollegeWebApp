import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  news: News[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private newsSub: Subscription;
  private authStatusSub: Subscription;
  constructor(
    public newsService: NewsService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.newsService.getNews();
    this.newsSub = this.newsService
      .getNewsUpdateListener()
      .subscribe((news: News[]) => {
        this.isLoading = false;
        this.news = news;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.newsSub.unsubscribe();
  }

  onDelete(newsId: string) {
    this.newsService.deletePost(newsId);
  }
}
