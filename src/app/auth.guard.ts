import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable }         from '@angular/core';
import { AuthserviceService } from './my-services/authservice.service';

declare var chrome: any;

@Injectable()
export class AuthGuard implements CanActivate {
  user: Object = {};
  signupInfo: Object = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    gender: '',
  };

  constructor(private authservice: AuthserviceService, private router: Router) {}

   canActivate(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot) {

      return this.authservice.isLoggedIn()
        .then(result => {

          console.log('AuthGuard Then returning TRUE + result of isLoggedIn: ');
          console.log(result);
          //this.router.navigate(['']);
          return true;
        })
        // offline search
        .catch(err => {

          console.log('AuthGuard Catch + err: ');
          console.log(err);

            return chrome.storage.sync.get(this.signupInfo, (response) => {

              console.log('Chrome.storage.get within AuthGuard + the localUser:  ')
              console.log(response);

              if(response.username === "" || undefined || {}) {

                console.log('AuthGuard Catch returning FALSE')
                return false;

              } else {
                console.log('AuthGuard Catch returning TRUE')

                return true;
              }
          });
        });
    }
}

//.catch(err => {

//   console.log('AuthGuard Catch: ');
//
//     return chrome.storage.sync.get(this.signupInfo, function(response) {
//
//     console.log(response);
//
//     if(response === {} || undefined) {
//
//       console.log('AuthGuard Catch and returning False')
//       return false;
//     } else {
//       return true;
//     }
//   });
//
// });
