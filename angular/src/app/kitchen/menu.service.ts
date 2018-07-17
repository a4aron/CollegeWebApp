import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Menu } from './menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menus: Menu[] = [];
    private menusUpdated = new Subject<Menu[]>();
    constructor(private http: HttpClient, public router: Router) { }


    getmenus() {
        this.http.get<{ message: string, menus: any }>(
            "http://localhost:3000/api/menu"
        )
            .pipe(
                map((postData) => {
                    return postData.menus.map(menus => {
                        return {
                            id:menus._id,
                            menuDayName: menus.menuDayName,
                            created_by_userName: menus.created_by_userName,
                            items: menus.items
                        }
                    })
                })
            )
            .subscribe((menusData) => {
                this.menus = menusData;
                this.menusUpdated.next([...this.menus]);

            });
        //return [...this.menus]; // copying and making a new array
    }
    getmenusUpdateListener() {
        return this.menusUpdated.asObservable();
    }



    addMenu(dayName:string,items:any) {
        console.log("menu server")
        const newMenu: Menu = {  _id:null,menuDayName: dayName, items: items };
        this.http.post<{ message: string,  menuId : string }>('http://localhost:3000/api/menu', newMenu)
            .subscribe((responseData) => { //only called if success 
                this.menusUpdated.next([...this.menus]);
                this.router.navigate(["/kitchen"]);
            });
    }


    deleteMenu(menuId : string){
        console.log("from delete service")
        this.http.delete('http://localhost:3000/api/menu/'+ menuId)
        .subscribe(()=>{
           const menusUpdated = this.menus.filter(myMenu =>
              myMenu._id!=menuId
           )
           this.menus = menusUpdated;
           this.menusUpdated.next([...this.menus]);
        })
    }
}






///////post menu