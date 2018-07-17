export interface MenuItem {
   // _id: string;
    session: string;
    menuList: string;
}

export interface Menu {
    _id: string;
  //  date: Date;
    menuDayName: string;
   // created_by_id: string;
    //created_by_userName: string;
   // created_on: Date;
   // updated_on?: Date;
    items: MenuItem[];
}
