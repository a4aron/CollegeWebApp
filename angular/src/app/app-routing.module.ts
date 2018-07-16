import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsListComponent } from "./news/news-list/news-list.component";
import { NewsCreateComponent } from "./news/news-create/news-create.component";

const routes : Routes = [
    {path : '', component : NewsListComponent},
    {path : 'create', component : NewsCreateComponent},
    {path : 'edit/:newsId', component : NewsCreateComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}