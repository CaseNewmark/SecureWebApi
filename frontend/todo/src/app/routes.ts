import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { AuthGuard } from "./guard/auth.guard";
import { ApiTesterComponent } from "./api-tester/api-tester.component";

export const routeConfig: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home page',
      canActivate: [AuthGuard]
    },
    {
      path: '',
      component: ApiTesterComponent,
      title: 'Api Tester',
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