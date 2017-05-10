import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthserviceService {

  BASE_URL: string = 'http://localhost:3000'; //   https://moodflowextension.herokuapp.com Remove this when deploying to production

  constructor(private myHttp: Http) { }

  signUpSocial(socialUser) {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/signupSocial`, socialUser, options)//, options
      .toPromise()
        .then((result) => {
          result.json();
        })
        .catch((err) => {
          err.json();
        })
  }

  signUp(user) {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/signup`, user, options)//, options
      .toPromise()
        .then((result) => {
          result.json();
        })
        .catch((err) => {
          err.json();
        })
  }


  login (credentials) {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/login`, credentials, options)
      .toPromise()
      .then((result) => {
        result.json();
      });
  }


  logout(callback) {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/logout`, {}, options)
      .toPromise()
      .then(result => {
        result.json();
        callback();
      });
  }


  isLoggedIn() {
    const options = { withCredentials: true };

    return this.myHttp.get(`${this.BASE_URL}/loggedin`, options)
      .toPromise()
      .then(result => result.json())
      .catch(result => result.json())
  }


  getPrivate() {
    const options = { withCredentials: true };

    return this.myHttp.get(`${this.BASE_URL}/private`, options)
      .toPromise()
      .then(result => result.json());
  }

  submitMoodInfo(info) {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/submitmood`, info, options)
      .toPromise()
      .then(result => result.json());
  }

  getMoodInfo() {
    const options = { withCredentials: true };

    return this.myHttp.get(`${this.BASE_URL}/getmood`, options)
      .toPromise()
      .then(result => result.json());
  }

  hasSubmitted() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/hasSubmitted`, {}, options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json())
      .catch((err) => {
        err.json();
      });
  }

  hasMeditatedBefore() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/hasMeditated`, {}, options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

  nowMeditated() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/heMeditated`, {}, options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

  hasSetHomePage() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/hasSetHomePage`, {}, options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

  getUnsplashPicture() {
    const options = { withCredentials: true };

    return this.myHttp.get(`https://api.unsplash.com/photos/random`, options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

  noSearchbar() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/noSearchbar`, {} ,options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

  yesSearchbar() {
    const options = { withCredentials: true };

    return this.myHttp.post(`${this.BASE_URL}/yesSearchbar`, {} ,options) //POST NEEEEEEDS 3 ARGUMENTS W CREDENTIALS
      .toPromise()
      .then(result => result.json());
  }

}
