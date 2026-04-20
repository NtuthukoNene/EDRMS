import { Routes } from '@angular/router';
import { Access } from 'src/app/pages/auth/access';
import { Login } from 'src/app/pages/auth/login';
import { Error } from 'src/app/pages/auth/error';
import { Register } from 'src/app/pages/auth/register';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
] as Routes;
