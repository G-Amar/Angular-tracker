import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  loggedInUser!: string | null;
  showRegister!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.showRegister = this.settingsService.getSettings().allowRegistration;

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  onLogoutClick() {
    if(confirm("Are you sure?")){
      this.authService.logout();
      alert(`${this.loggedInUser} has logged out!`)
      this.router.navigate(['/login']);
    }
  }

}
