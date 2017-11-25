import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './_components/app.component';
import {LoginComponent} from './_components/login/login.component';
import {HomeComponent} from './_components/home/home.component';
import {UserComponent} from './_components/user/user.component';
import {UserService} from './_services/user.service';
import {AppService} from './_services/app.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './_services/auth.service';
import {RegisterComponent} from './_components/register/register.component';
import {TourComponent} from './_components/tour/tour.component';
import {BusinessclassComponent} from './_components/businessclass/businessclass.component';
import {TrellogoldComponent} from './_components/trellogold/trellogold.component';
import {CardComponent} from './_components/card/card.component';
import {TeamComponent} from './_components/team/team.component';
import {GuideComponent} from './_components/guide/guide.component';
import {ChangePasswordComponent} from './_components/change-password/change-password.component';
import {SignupComponent} from './_components/signup/signup.component';
import {ForgotPasswordComponent} from './_components/forgot-password/forgot-password.component';
import {LogoutComponent} from './_components/logout/logout.component';
import {ShareComponent} from './_components/share/share.component';
import {PricingComponent} from './_components/pricing/pricing.component';
import {TableUserComponent} from './_components/table-user/table-user.component';
import {TableWelcomComponent} from './_components/table-welcom/table-welcom.component';
import {PlatformComponent} from './_components/platform/platform.component';
import {PrivarePolicyComponent} from './_components/privare-policy/privare-policy.component';
import {AboutUsComponent} from './_components/about-us/about-us.component';
import {ProjectService} from './_services/project.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        TourComponent,
        BusinessclassComponent,
        TrellogoldComponent,
        CardComponent,
        TeamComponent,
        GuideComponent,
        ChangePasswordComponent,
        SignupComponent,
        ForgotPasswordComponent,
        LogoutComponent,
        ShareComponent,
        PricingComponent,
        TableUserComponent,
        TableWelcomComponent,
        PlatformComponent,
        PrivarePolicyComponent,
        AboutUsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {path: 'user', component: UserComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'tour', component: TourComponent},
            {path: 'business', component: BusinessclassComponent},
            {path: 'trello-gold', component: TrellogoldComponent},
            {path: 'card', component: CardComponent},
            {path: 'team', component: TeamComponent},
            {path: 'guide', component: GuideComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'signup', component: SignupComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'logout', component: LogoutComponent},
            {path: 'share', component: ShareComponent},
            {path: 'pricing', component: PricingComponent},
            {path: 'table-user', component: TableUserComponent},
            {path: 'table-welcom', component: TableWelcomComponent},
            {path: 'platform', component: PlatformComponent},
            {path: 'private-policy', component: PrivarePolicyComponent},
            {path: 'about-us', component: AboutUsComponent}
        ])
    ],
    providers: [
        AppService,
        AuthService,
        UserService,
        ProjectService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
