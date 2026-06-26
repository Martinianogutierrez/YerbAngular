import { Routes } from '@angular/router';
import { YerbaStore } from './yerba-store/yerba-store';
import { YerbaAbout } from './yerba-about/yerba-about';

export const routes: Routes = [
    {path: '', redirectTo: 'yerbas', pathMatch: 'full'},
    {path: 'yerbas', component: YerbaStore},
    {path: 'about', component: YerbaAbout}
];
