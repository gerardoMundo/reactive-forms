import { Component } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent {
  public sideMenu: Menu[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
    { title: 'Validaciones', route: './auth' },
  ];
}
