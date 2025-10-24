import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'instrument-list',
        loadComponent: () => import ('@/pages/instrument-list.component/instrument-list.component') 
    },
    {
        path: '**',
        redirectTo: 'instrument-list'
    }
];
