import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
