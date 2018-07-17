import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path : '', component : NewsListComponent},
    {path : 'create', component : NewsCreateComponent, canActivate: [AuthGuard]},
    {path : 'edit/:newsId', component : NewsCreateComponent, canActivate: [AuthGuard]},
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}
