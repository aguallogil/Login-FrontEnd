import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  isLoading=signal<boolean>(false);
  title = 'Login-FrontEnd';
  private loadingSubscription!: Subscription;
  constructor(
    private readonly loadingService:LoadingService,
    readonly authService:AuthService
  ){}
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe((isLoading) =>this.isLoading.set(isLoading));
  }
  logout(){
      this.authService.logout();
  }
}
