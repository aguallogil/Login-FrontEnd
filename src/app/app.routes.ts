import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { authGuard } from './guards/auth.guard';
import { jwtGuard } from './guards/jwt.guard';
import { UserCreateComponent } from './user-create/user-create.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[jwtGuard]
    },
    {
        path: 'user',
        component: UserListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user/:id',
        component: UserCreateComponent,
        canActivate: [authGuard]
    }
];
