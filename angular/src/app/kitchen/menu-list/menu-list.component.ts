import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { Subscription } from '../../../../node_modules/rxjs';
import { MenuService } from '../menu.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  isLoading = false;
  private menuSub: Subscription;
  constructor(private menuService:MenuService) { }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.getmenus();
    this.menuSub = this.menuService.getmenusUpdateListener()
    .subscribe((menu: Menu[]) => {
        this.isLoading = false;
        this.menus = menu;

    });

  }



  remove(menuId){
    if(!isNullOrUndefined(menuId)){

      this.menuService.deleteMenu(menuId);
     
    }
  }

  ngOnDestroy(){
    this.menuSub.unsubscribe();
  }

}
