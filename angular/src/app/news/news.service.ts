import { News } from './news.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private news: News[] = [];
    private newsUpdated = new Subject<News[]>();

    constructor(private http: HttpClient, public router: Router) {}
         
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
                        id : news._id,
                        imagePath : news.imagePath
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
    getTheNews(id: string) {
        return this.http.get<{ _id: string; category: string; content: string, imagePath: string}>(
          'http://localhost:3000/api/news/'+ id);
      }
    addNews(category: string, content: string, image: File) {
        console.log(image+ "--------------");
       
        const newsData = new FormData();
        newsData.append("category", category);
        newsData.append("content", content);
        newsData.append("image", image, category);

        this.http.post<{ message: string,  news : News }>('http://localhost:3000/api/news', newsData)
            .subscribe((responseData) => { //only called if success
                const mynews : News ={id: responseData.news.id, category: category, content: content, imagePath: responseData.news.imagePath}; 
                this.news.push(mynews);
                this.newsUpdated.next([...this.news]);
                this.router.navigate(["/"]);
            });
    }
    updateNews(id: string, category: string, content: string, image: File | string){
        let newsData: News | FormData;
        if(typeof (image) === 'object'){
            newsData = new FormData();
            newsData.append("id", id);
            newsData.append("category", category);
            newsData.append("content", content);
            newsData.append("image", image, category);
        }
        else{
            newsData = {
                id:id,
                category:category,
                content: content,
                imagePath:image
            };
        }

        this.http.put('http://localhost:3000/api/news/'+ id, newsData)
        .subscribe(response => {
            const updatedNews = [...this.news];
            const oldNewsIndex = updatedNews.findIndex(p => p.id === id);
            const news: News = {
                id:id,
                category:category,
                content: content,
                imagePath: ""
            }
            updatedNews[oldNewsIndex] = news;
            this.news = updatedNews;
            this.newsUpdated.next([...this.news]); 
            this.router.navigate(["/"]);
        })
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