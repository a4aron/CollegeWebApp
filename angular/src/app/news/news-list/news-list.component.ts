import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { News } from '../news.model'
import { NewsService } from "../news.service";

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
    // news = [
    //     {title : 'First News', content : 'First News Component'},
    //     {title : 'Second News', content : 'Second News Component'},
    //     {title : 'Third News', content : 'Third News Component'}
    // ]
    news: News[] = [];
    private newsSub: Subscription;
    constructor(public newsService: NewsService) {

    }
    ngOnInit() {
        this.newsService.getNews();
        this.newsSub = this.newsService.getNewsUpdateListener().subscribe((news: News[]) => {
            this.news = news;
        });
    }
    ngOnDestroy() {
        this.newsSub.unsubscribe();
    }

    onDelete(newsId : string){
        this.newsService.deletePost(newsId);
    }

}