import { News } from './news.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private news: News[] = [];
    private newsUpdated = new Subject<News[]>();

    constructor(private http: HttpClient) {}
        // this.http.get<{ message: string, news: News[] }>("http://localhost:3000/api/news")
        //     .subscribe((newsData) => {
        //         this.news = newsData.news;
        //         this.newsUpdated.next([...this.news]);
        //     });
    
    getNews() {
        this.http.get<{ message: string, news: any }>(
            "http://localhost:3000/api/news"
        )
        .pipe(
            map((postData)=>{
                return postData.news.map(news =>{
                    return {
                        category : news.category,
                        content : news.content,
                        id : news._id
                    }
                })
            })
        )
        .subscribe((newsData) => {
            this.news = newsData;
            this.newsUpdated.next([...this.news]);
        });
        //return [...this.news]; // copying and making a new array
    }
    getNewsUpdateListener() {
        return this.newsUpdated.asObservable();
    }
    addNews(category: string, content: string) {
        const mynews: News = { id: null, category: category, content: content };
        this.http.post<{ message: string,  newsId : string }>('http://localhost:3000/api/news', mynews)
            .subscribe((responseData) => { //only called if success 
                const id = responseData.newsId;
                mynews.id = id;
                this.news.push(mynews);
                this.newsUpdated.next([...this.news]);
            });
    }
    deletePost(newsId : string){
        this.http.delete('http://localhost:3000/api/news/'+ newsId)
        .subscribe(()=>{
           const updatedNews = this.news.filter(mynews =>
               mynews.id !== newsId
           )
           this.news = updatedNews;
           this.newsUpdated.next([...this.news]);
        })
    }
}