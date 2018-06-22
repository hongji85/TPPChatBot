import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';

import { ValidateService } from './Services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SocketService } from './Services/socket.service';
import { CustomerChatDialogComponent } from './Components/customer-chat-dialog/customer-chat-dialog.component';
import { OperatorComponent } from './Components/operator/operator.component';
import { HistoryComponent } from './Components/history/history.component';
import { HistoryService } from './Services/history.service';
import { ChatlogComponent } from './Components/chatlog/chatlog.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'customer', component: CustomerChatDialogComponent, canActivate:[AuthGuard] },
  { path: 'operator', component: OperatorComponent, canActivate:[AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate:[AuthGuard] },
  { path: 'chatlog/:customerId', component: ChatlogComponent, canActivate:[AuthGuard] }
]

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CustomerChatDialogComponent,
    OperatorComponent,
    HistoryComponent,
    ChatlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, SocketService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
