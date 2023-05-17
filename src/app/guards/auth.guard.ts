import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => {
      if(!auth){
        this.router.navigate(['/login']); //redirect to login page
        return false;
      } else {
        return true;
      }
    }));
  }
}