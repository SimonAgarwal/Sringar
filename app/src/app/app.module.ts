import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './home/home.component';
import { KurtiComponent } from './kurti/kurti.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ShowProductComponent } from './show-product/show-product.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RingComponent } from './ring/ring.component'

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomeComponent,
    KurtiComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ShowProductComponent,
    CartComponent,
    WishlistComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    RingComponent,
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
