import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login-form.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductService } from './services/product.service';
import { ShowSmallErrorComponent } from './show-small-error/show-small-error.component';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    PaymentComponent,
    OrderComponent,
    AdminComponent,
    ShowSmallErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'product-list', component: ProductListComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'order', component: OrderComponent}
    ])
  ],
  providers: [
    provideHttpClient(),
    ProductService,
    AuthService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
