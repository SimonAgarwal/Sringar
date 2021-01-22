import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './home/home.component';
import { KurtiComponent } from './kurti/kurti.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{path: '', redirectTo: "/home",pathMatch: 'full'},
                        {path:'home',component:HomeComponent},
                        {path:'products/earring',component:KurtiComponent,},
                        {path:'login',component:LoginComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'products/earring/:id',component:ShowProductComponent}];
                        //canActivate:[AuthGuard] to apply guard

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
