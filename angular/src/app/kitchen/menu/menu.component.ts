import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public myForm: FormGroup; // our form model
  constructor(private _fb: FormBuilder,private menuService:MenuService) { }


  onsave(){
      console.log("comp")
    if(this.myForm.invalid) return;
        this.menuService.addMenu(this.myForm.value.menuDayName,this.myForm.value.items);
    this.myForm.reset();
}




  ngOnInit() {
    this.myForm = this._fb.group({
      menuDayName: ['', [Validators.required, Validators.minLength(5)]],
      items: this._fb.array([
          this.initItem(),
      ])
  });
  }

  initItem() {
    // initialize our address
    return this._fb.group({
        session: ['', Validators.required],
        menuList: ['']
    });
}

addItem() {
// add address to the list
const control = <FormArray>this.myForm.controls['items'];
control.push(this.initItem());
}

removeItem(i: number) {
// remove address from the list
const control = <FormArray>this.myForm.controls['items'];
control.removeAt(i);
}



}
