import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../my-services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router'; // This is specifically to get information from the URL. So in order to do req.params in Angular.

declare var jQuery: any;
declare var $: any;
declare var chrome: any;


@Component({
  selector: 'app-newuserlanding',
  templateUrl: './newuserlanding.component.html',
  styleUrls: ['./newuserlanding.component.min.css']
})
export class NewuserlandingComponent implements OnInit {
  myBoolean: Boolean = false;

  loginInfo = {
    username: '',
    password: ''
  };

  signupInfo = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    gender: '',
    searchbar: true
  };

  signUpInfoSocial = {
    firstName: '',
    lastName: '',
    socialID: '',
    searchbar: true
  }

  user:any;
  handleError: any;
  error: string;



  constructor(
    private mySession: AuthserviceService,
    private myRoute: ActivatedRoute,
    private myNavigator: Router,

  ) {}

  ngOnInit() {
    // check if user exist in the server
    this.mySession.isLoggedIn()
    .then( userInfo => {
      if(userInfo && userInfo.message !== 'Unauthorized'){

        console.log('Found user info (below) and now redirecting to /home')
        console.log(userInfo)

        this.user = userInfo;

        this.myNavigator.navigate(['home']);
      } else {

        return;
      }
    })
    // if offline check in local storage
    .catch(() => {
      chrome.storage.sync.get(this.signupInfo, (response) => {
        console.log('catch of new user landing + response: ');
        console.log(response);

        if(response.username === ""){
          console.log('returning from catch in newuserlanding component and not navigating away')
          return;

        } else {
          console.log('navigating from catch in newuserlanding component')
          this.myNavigator.navigate(['home']);

          return;
        }
      });

    });



    $(window).scroll(function() {
      if ($(this).scrollTop() > 500) {
        $('.boxes').fadeIn(1000);
      } else {
        $('.boxes').fadeOut(1000);
      }
    });
  }

  public popup() {
    $('.loginpopup').slideUp(300);

    $('.popup').fadeIn(1000);    //css('display', 'block');
    $('.popupbg').css({'display': 'flex', 'background-color': 'rgba(0, 0, 0, 0.1)'});
    $('#title, #titlebutton, #nav, .ion-ios-arrow-down').css('filter', 'blur(4px)');
  }

  public closepopup() {
    $('.popup, .popupbg').fadeOut(1000);
    setTimeout(function() {
      $('#title, #titlebutton, #nav, .ion-ios-arrow-down').css('filter', 'blur(0px)');
    }, 300);
  }

  public loginpopup() {
    $('.loginpopup').slideToggle(300);
    if(this.myBoolean === false) {
      $('#title, #titlebutton').css('filter', 'blur(3px)');
      this.myBoolean = true;
    } else {
      $('#title, #titlebutton').css('filter', 'blur(0px)');
      this.myBoolean = false;
    }
  }

  public guy() {
    this.signupInfo.gender = 'male';

    $('#girl').prop('checked', false);
  }

  public girl() {
    this.signupInfo.gender = 'female';
    $('.guycheckbox').prop('checked', false);
  }

  // --------------------------- LOGIN SIGNUP LOGIC ----------------------

  signup() {
    const thePromise = this.mySession.signUp(this.signupInfo);

    thePromise.then(userInfo => {
      console.log('User was saved in the server');
      // Save user to Local Storage using Chrome API

      //chrome.storage.sync.set(this.signupInfo, () => {
        // Notify that we saved.
        console.log('User was saved locally in the pc');
    //  });

      this.myNavigator.navigate(['home']);
      return;
    });

    thePromise.catch((err) => {
      this.error = err;
      console.log(this.error)
    });
  }



  login(loginInfo){
    const thePromise = this.mySession.login(this.loginInfo);

    thePromise.then((apiRequestResult) => {
      this.user = apiRequestResult;

      (this.user);

      this.error = null;
      this.myNavigator.navigate(['home'])
    });

    thePromise.catch((err) => {
      this.error = err;
      this.user = null;
    });
  }

  scrollDown() {
    $(".howitworks").animatescroll({ scrollSpeed: 1500});
  }

  scrollAllTop() {
    $("body").animatescroll({ scrollSpee: 1500 });
  }

}
