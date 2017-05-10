import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { NewuserlandingComponent }      from './newuserlanding/newuserlanding.component';
import { AuthGuard }                    from './auth.guard';
import { ExistinguserlandingComponent } from './existinguserlanding/existinguserlanding.component';
import { StatpageComponent }            from './statpage/statpage.component';
import { MeditatepageComponent }        from './meditatepage/meditatepage.component';

const routes: Routes = [
  {
    path: '',
    component: NewuserlandingComponent,
  },
  {
    path: 'home',
    component: ExistinguserlandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'flow',
    component: StatpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meditate',  //When you go to any page aside fomr these, we redirect to the homepage.
    component: MeditatepageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',  //When you go to any page aside fomr these, we redirect to the homepage.
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
