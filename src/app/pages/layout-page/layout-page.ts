import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenu } from '../../share/aside-menu/aside-menu';

@Component({
  selector: 'app-layout-page',
  imports: [RouterOutlet, AsideMenu],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.css',
})
export class LayoutPage {}
