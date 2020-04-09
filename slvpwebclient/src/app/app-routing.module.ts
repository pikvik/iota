import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAdminComponent} from './components/t-admin/t-admin.component';
import { TCustomerComponent} from './components/t-customer/t-customer.component';
import { LoginComponent} from '../app/components/login/login.component';


const routes: Routes = [
  { path: 'customer', component: TCustomerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: TAdminComponent},
  { path: '', redirectTo: '/customer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
