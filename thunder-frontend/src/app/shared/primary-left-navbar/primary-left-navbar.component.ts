import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'thunder-primary-left-navbar',
  templateUrl: './primary-left-navbar.component.html',
  styleUrls: ['./primary-left-navbar.component.scss']
})
export class PrimaryLeftNavbarComponent implements OnInit {
  currentRoute: string;
  constructor(private route: Router) {
    console.log(route);
    this.currentRoute = route.url;
   }

  menus: Menu[];
  ngOnInit(): void {
    this.menus = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'icon-grid',
        show: true
      },
      {
        name: 'Uploads',
        path: '/uploads',
        icon: 'icon-upload',
        show: true
      },
      {
        name: 'Example',
        show: false,
        icon: 'icon-layout',
        children: {
          id: 'dashboard',
          submenu: [
            {
              name: 'Exm Children 1',
              path: '/example'
            },
            {
              name: 'Exm Children 2',
              path: '/example2'
            }
          ]
        }
      },
      {
        name: 'Link Store',
        path: '/link-store',
        icon: 'icon-box',
        show: true
      },
    ]
  }


}
