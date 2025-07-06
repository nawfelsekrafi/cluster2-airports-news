import { Routes } from '@angular/router';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsListComponent } from './components/news-list/news-list.component';

export const routes: Routes = [
    {
        path: '',
        component: NewsListComponent
    },
    {
        path: 'add-news',
        component: NewsFormComponent
    },
    {
        path: '**',
        redirectTo: ''
    }   

];
