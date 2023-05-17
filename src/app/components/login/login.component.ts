import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']); //redirect to dashboard
      }
      
    })
  }

  onSubmit() {
    this.authService.login(this.email, this.password).then(res => {
      alert("Login successful!")
      this.router.navigate(['/']); //go to dash
    }).catch(err => {
      alert(err);
    });
  }
}
