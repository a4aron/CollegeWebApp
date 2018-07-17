import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsListComponent } from "./news/news-list/news-list.component";
import { NewsCreateComponent } from "./news/news-create/news-create.component";
import { MenuListComponent } from "./kitchen/menu-list/menu-list.component";
import { MenuComponent } from "./kitchen/menu/menu.component";

const routes: Routes = [
    { path: '', component: NewsListComponent },
    { path: 'create', component: NewsCreateComponent },
    { path: 'kitchen', component: MenuListComponent },
    { path: 'createMenu', component: MenuComponent },
    { path: 'edit/:newsId', component: NewsCreateComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}