import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NewsService } from "../news.service";

@Component({
    selector : 'app-news-create',
    templateUrl : './news-create.component.html',
    styleUrls : ['./news-create.component.css']
})
export class NewsCreateComponent{
    enteredTitle = '';
    enteredContent = '';

    constructor(public newsService : NewsService){}

    onAddNews(form : NgForm){
        if(form.invalid) return;
        this.newsService.addNews(form.value.category, form.value.content);
        form.resetForm();
    }
}