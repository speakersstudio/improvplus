import { NgModule }         from "@angular/core";
import { RouterModule, Routes, PreloadAllModules }     from "@angular/router";

// import { AuthGuard } from '../service/auth-guard.service';
import { AppLoadGuard } from '../service/app-load-guard.service';

import { WelcomeComponent } from '../component/ms.welcome.component';

import { LoginScreenComponent } from '../component/login-screen.component';
import { SignupComponent } from '../component/signup.component';
import { ChangePasswordComponent } from '../component/change-password.component';
import { InviteComponent } from '../component/invite.component';
import { ImprovisersComponent } from '../component/improvisers.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'login',
        component: LoginScreenComponent
    },
    {
        path: 'improvisers',
        component: ImprovisersComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'invite/:id',
        component: InviteComponent
    },
    {
        path: 'resetMyPassword/:token',
        component: ChangePasswordComponent
    },
    {
        path: 'app',
        loadChildren: 'app/app/module/improvplus.module#ImprovPlusModule'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, 
            { preloadingStrategy: PreloadAllModules }
        ) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
