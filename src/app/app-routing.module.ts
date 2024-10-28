import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login-form.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'order', component: OrderComponent},
  {path: 'product-list/:categoryId', component: ProductListComponent},
  {path: 'product-list/:categoryId/:page', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
