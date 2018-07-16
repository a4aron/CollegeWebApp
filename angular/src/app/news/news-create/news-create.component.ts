import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsService } from "../news.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { News } from "../news.model";

@Component({
    selector : 'app-news-create',
    templateUrl : './news-create.component.html',
    styleUrls : ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit{
    enteredTitle = '';
    enteredContent = '';
    news: News;
    imagePreview: string;
    isLoading = false;
    private mode = 'create';
    private newsId : string;
    form : FormGroup;
    
    constructor(public newsService : NewsService, public route: ActivatedRoute){}

    onSaveNews(){
        if(this.form.invalid) return;
        this.isLoading = true;
        if(this.mode === 'create'){
            this.newsService.addNews(this.form.value.category, this.form.value.content);
        }else{
            this.newsService.updateNews(this.newsId,this.form.value.category, this.form.value.content)
        }
       
        this.form.reset();
    }
    ngOnInit(){
        this.form = new FormGroup({
            category : new FormControl(null, {validators: [Validators.required]}),
            content : new FormControl(null, {validators:[Validators.required]}),
            // image : new FormControl(null)
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) =>{
            if(paramMap.has('newsId')){
                this.mode = 'edit';
                this.newsId = paramMap.get('newsId');
                this.isLoading = true;
                this.newsService.getTheNews(this.newsId).subscribe(newsData =>{
                this.isLoading = false;
                this.news = {id: newsData._id, category: newsData.category, content : newsData.content};
                this.form.setValue({'category': this.news.category, 'content': this.news.content})    
                });
            }else{
                this.mode = 'create';
                this.newsId = null;
            }
        });
    }
    onImagePicked(event : Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image:file});
        this.form.get('image').updateValueAndValidity();
        // console.log(file);
        // console.log(this.form);
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }


}