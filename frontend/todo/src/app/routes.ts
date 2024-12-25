import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './guard/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [AuthGuard],
  },
  {
    path: 'todo-list',
    component: TodoListComponent,
    title: 'ToDo List',
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
    title: 'Home details',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
