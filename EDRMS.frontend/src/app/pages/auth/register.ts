import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, MessageModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create Account</div>
                            <span class="text-muted-color font-medium">Register to get started</span>
                        </div>

                        <p-message *ngIf="errorMessage" severity="error" [text]="errorMessage" styleClass="mb-4 w-full" />

                        <div>
                            <label for="firstName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">First Name</label>
                            <input pInputText id="firstName" type="text" placeholder="First name" class="w-full md:w-120 mb-6" [(ngModel)]="firstName" />

                            <label for="lastName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Last Name</label>
                            <input pInputText id="lastName" type="text" placeholder="Last name" class="w-full md:w-120 mb-6" [(ngModel)]="lastName" />

                            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email" type="email" placeholder="Email address" class="w-full md:w-120 mb-6" [(ngModel)]="email" />

                            <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-6" [fluid]="true"></p-password>

                            <p-button 
                                label="Create Account" 
                                styleClass="w-full mt-4"
                                [loading]="loading"
                                (onClick)="onRegister()">
                            </p-button>

                            <div class="text-center mt-6">
                                <span class="text-muted-color">Already have an account? </span>
                                <a routerLink="/auth/login" class="text-primary font-medium cursor-pointer">Sign in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Register {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    loading: boolean = false;
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onRegister(): void {
        this.errorMessage = '';
        this.loading = true;

        this.authService.register({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}