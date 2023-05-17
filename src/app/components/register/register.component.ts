import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  onSubmit() {
    this.authService.registerUser(this.email, this.password).then(res => { //returns a promise
      alert(`${this.email} has been registered and logged in!`);
      this.router.navigate(['/']);
    }).catch(err => {
      alert(err);
    })
  }

}
