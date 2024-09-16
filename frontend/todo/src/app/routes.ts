import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { AuthGuard } from "./guard/auth.guard";

export const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
      canActivate: [AuthGuard]
    },
    {
      path: 'test',
      component: TestComponent,
      title: 'Home details'
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];