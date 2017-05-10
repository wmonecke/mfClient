import { Component, OnInit, NgZone } from '@angular/core';
import { AuthserviceService }        from '../my-services/authservice.service';
import { Router, ActivatedRoute }    from '@angular/router'; // This is specifically to get information from the URL. So in order to do req.params in Angular.
//import   Unsplash                   from 'unsplash-js/dist/unsplash.min';


declare var jQuery: any;
declare var $: any;
declare var chrome: any;



@Component({
  selector: 'app-existinguserlanding',
  templateUrl: './existinguserlanding.component.html',
  styleUrls: ['./existinguserlanding.component.min.css']
})
export class ExistinguserlandingComponent implements OnInit {
  user: any = {
    searchbar: true
  };
  user2: Object = {};
  currentUser: any;
  today: Date = new Date;
  quote: Object;
  myString: string;
  googlestring = {
    searchvalue: ''
  }

  videos: Array<string> = ['https://www.youtube.com/embed/SuPLxQD4akQ?autoplay=1', 'https://www.youtube.com/embed/26U_seo0a1g?autoplay=1', 'https://www.youtube.com/embed/Yb-OYmHVchQ?autoplay=1', 'https://www.youtube.com/embed/K2bw52VjJLM?autoplay=1', 'https://www.youtube.com/embed/eRaTpTVTENU?autoplay=1', 'https://www.youtube.com/embed/2_fDhqRk_Ro?autoplay=1', 'https://www.youtube.com/embed/DvtxOzO6OAE?autoplay=1', 'https://www.youtube.com/embed/D_Vg4uyYwEk?autoplay=1', 'https://www.youtube.com/embed/KHaooRlwtzI?autoplay=1', 'https://www.youtube.com/embed/lY7Mf6PzZyA?autoplay=1', 'https://www.youtube.com/embed/zCyB2DQFdA0?autoplay=1', 'https://www.youtube.com/embed/z1PSbDmV8Gw?autoplay=1', 'https://www.youtube.com/embed/H1sXTmaqRHU?autoplay=1'];
//<iframe width="897" height="455" src="https://www.youtube.com/embed/fxrSr2vV68g" frameborder="0" allowfullscreen></iframe>
  isDataTime: Boolean = false;

  userMood: Object = {
    moodValue: 5,
    moodComment: '',
  }

  hasUserSubmitted: Boolean = false;
  firstTime: Object = {};

  unsplashAPIresponse: any;

  unsplashPic: any = {
    location: {
      title: ''
    }
  };


  //DATES
  now = new Date();
  monthNames: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dayOfCurrentMonth = new Date().getDate();
  currentMonth = this.now.getMonth();
  stringMonth = this.monthNames[this.currentMonth];

  // User Schema
  signupInfo = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    gender: '',
    searchbar: true
  };

  weOnline: Boolean;

  constructor(
    private mySession: AuthserviceService,
    private myRoute: ActivatedRoute,
    private myNavigator: Router,
    private zone: NgZone
  ){}


  ngOnInit() {

    if (window.navigator.geolocation) {
      var failure, success;

      success = function(position) {
        console.log(position);
      };
      
      failure = function(message) {
        alert('Cannot retrieve location!');
      };

      navigator.geolocation.getCurrentPosition(success, failure, {
        maximumAge: Infinity,
        timeout: 5000
      });
    }


    console.log('Are we online(true) or offline(false)?')
    console.log(window.navigator.onLine);
    this.weOnline = window.navigator.onLine;

    if(this.weOnline === false) {

      console.log('within if statement');
      $('#searchbar').prop('checked', false);

      this.getPicture();
      this.getLocalUser();
      return;
    }


    this.getPictureAPI();



    this.mySession.hasSetHomePage()
    .then(result => {
      this.firstTime = result;
    })
    .catch(err => {
      console.log(err);
    });



    this.mySession.isLoggedIn()
    // make request to server via HTTP
    .then(userInfo => {
      // if successful do:
      console.log('isLoggedIn successful. User was found in the SERVER + user: ');
      console.log(userInfo);

      this.user = userInfo;
      this.user2 = userInfo;

      if(this.user.searchbar === false) {
        $('#searchbar').prop('checked', false);
      } else if(this.user.searchbar) {
        $('#searchbar').prop('checked', true);
      }
    })
    // if request via HTTP fails do:
    .catch(() => {
      // find user in Local Storage and set it equal to this.user;
      console.log('catch of isLoggedIn within home component, now trying to get the local user');
      this.getLocalUser();
    });



    this.mySession.hasSubmitted()
    .then( trueOrFalse => this.hasUserSubmitted = trueOrFalse.hasSubmitted )
    .catch((err) => {
      console.log(err);
    })
  } // close ngOnInit



  getLocalUser() {
    chrome.storage.sync.get(this.signupInfo, (response) => {

      console.log('within getLocalUser + local user: ')
      console.log(response);

      this.user = response;
      this.user2 = response;

      if(this.user.searchbar === false) {
        $('#searchbar').prop('checked', false);
      } else if(this.user.searchbar) {
        $('#searchbar').prop('checked', true);
      }
    });

    this.user = this.user2;
  }


  getPicture() {
    let myRandomNum = Math.floor(Math.random() * 5) + 1
    let mySrc = `assets/images/backgroundImages/${myRandomNum}.jpg`
    $('#myChangingBackground').attr('src', mySrc);

    $('#picLocation').html('Planet Earth');
    $('#picAuthor').html(`Photo: <a class="myAnchor" style="color: rgba(255, 255, 255, 0.8);" href="#"> Dreamland </a> / <a style="color: rgba(255, 255, 255, 0.8);" class="myAnchor" href="#">Unsplash</a>`);
  }



  getPictureAPI() {
    $.ajax({
    url: "https://api.unsplash.com/photos/random",
    type: 'get',
    dataType: "json",
    data: "client_id=29b43b6caaf7bde2a85ef2cfddfeaf1c1e920133c058394a7f8dad675b99921b&collections=281002",
    success: ( response ) => {
        $('#myChangingBackground').attr('src', response.urls.regular);
        this.unsplashAPIresponse = response;

        if(response.location === undefined) {
          $('#picLocation').html('Planet Earth');
          $('#picAuthor').html(`Photo: <a style="color: rgba(255, 255, 255, 0.8);" class="myAnchor" href="${response.user.links.html}?utm_source=moodflow&utm_medium=referral&utm_campaign=api-credit">${response.user.name}</a> / <a class="myAnchor" style="color: rgba(255, 255, 255, 0.8);" href="https://unsplash.com/">Unsplash</a>`);
        } else {
          $('#picLocation').html(response.location.title);
          $('#picAuthor').html(`Photo: <a class="myAnchor" style="color: rgba(255, 255, 255, 0.8);" href="${response.user.links.html}?utm_source=moodflow&utm_medium=referral&utm_campaign=api-credit">${response.user.name}</a> / <a style="color: rgba(255, 255, 255, 0.8);" class="myAnchor" href="https://unsplash.com/">Unsplash</a>`);
        }
      },
    error: () => {
      console.log('getPictureAPI() error. Calling getPicture()');
        this.getPicture();
      }

    });
  }



  randomQuote() {
    $.ajax({
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
    dataType: "jsonp",
    success: function( response ) {
      $("#random_quote").html(
        '"'+response.quoteText+'"');
      $("#random_quoter").html("&dash; " + response.quoteAuthor + " &dash;");
      }
    });
  }



  hover() {
    $('#random_quote').fadeOut(300, () => {
      $("#random_quoter").fadeIn(300);

      setTimeout(() => {
        $("#random_quoter").fadeOut(300, () => {
          $('#random_quote').fadeIn(300);
        });
      }, 1000);

    });
  }



  showContinue() {
    $('.showInputValue').fadeIn(100);

    setTimeout(() => {
      $('.continueButton').fadeIn(400);
    }, 400);
  }



  showCommentInput() {
    $('.disappear').fadeOut(150, () => {
      setTimeout(() => {
        $('.second').fadeIn(300);
        setTimeout(() => {
          $('.third').fadeIn(300);
        }, 460);
      }, 460);

    });
  }

  showSubmitButton() {
    setTimeout(() => {
      $('.submitButton').fadeIn(400);
    }, 300);
    $('.skip').css({'display': 'block', "left": "150px"});
    $('#widerInput').css('width', '350px');
  }

  skipped() {
    $('.reasonInput').val('');

    $('.highlight, .reasonInput, .inputInfo, .skip, .submitButton, .greeting, .overlayPNG').fadeOut(500)
      setTimeout(() => {
        $('.greeting').css('display', 'inline').html('Your moodflow:')
        $('#firstStats').fadeIn(700).css('display', 'inline-block');
        $('.greeting, .forMonth, .ion-close-round').fadeIn(600);
      }, 500);
  }

  showStats() {
    $('.highlight, .reasonInput, .inputInfo, .skip, .submitButton, .greeting, .overlayPNG').fadeOut(500)
      setTimeout(() => {
        $('.greeting').css('display', 'inline').html('Your moodflow:')
        $('#firstStats').fadeIn(700).css('display', 'flex');
        $('.greeting, .forMonth, .ion-close-round').fadeIn(600);
      }, 500);
  }

  showMood() {
    this.isDataTime = true;

    $('#secondGreeting, .highlight, button, #thirdGreeting, .overlayPNG').fadeOut(500, () => {
      setTimeout(() => {
        $('#secondGreeting').css('display', 'block').html('Your moodflow:');
        $('#secondForMonth, #iconClose').fadeIn(700);
        $('.alreadySubmittedStats').fadeIn(600).css('display', 'block');
      }, 510);
    });

  }

  startMeditation() {
    $('#parent').css('display', 'block');
    setTimeout(() => {
      $('.hello').css('display', 'block').addClass('shadow');
    },10);

    $('#reflectButton, #meditateButton, #motivateButton').fadeOut(500);
    setTimeout(() => {
      $('.letsStart').fadeIn(500);
    }, 500);


    setTimeout(() => {

      this.user = {};

      this.zone.run(() => {
        this.myNavigator.navigate(['meditate']);
      });

    },4000);
  }

  logoutFadeIn() {
    $('.logoutpopup').fadeToggle(300);
  }

  logout() {
    let userConfirm = confirm('Are you sure you want to log out?');

    if (userConfirm) {
      console.log('user confirmed')

    //chrome.storage.sync.clear(()=> {
        console.log('local log out');
        this.mySession.logout(()=> {
          console.log('server log out');
          this.myNavigator.navigate(['']);
        });
    //  });

    }

    return;
  }

  submitMoodInfo() {
    this.mySession.submitMoodInfo(this.userMood)
      .then(() => {

        this.isDataTime = true;
      })
      .catch((err) => {
        (err);
      })
  }

  logoutFadeOut() {
    $('.logoutpopup').fadeOut(300);
  }

  doneReviewing() {
    $('#firstStats, .alreadySubmittedStats, .greeting, .forMonth, .ion-close-round, .skip').fadeOut(500)
    $('.overlayPNG').fadeIn(1500);
    setTimeout(() => {
      this.hasUserSubmitted = true;
    }, 500);
  }

  doneReflecting() {
    $('#secondGreeting, #secondForMonth, #iconClose, .alreadySubmittedStats').fadeOut(500, () => {
    });

    setTimeout(() => {
      $('#thirdGreeting, #secondWouldYou, button, .overlayPNG').fadeIn(500);
    }, 500);
  }

  closeIframe() {
    $('#closeiframe').fadeOut(400);
    $('.myiframe').attr('src', '');
    $('.myiframe').fadeOut(500);
  }

  startMotivation() {
    let oneVid = this.videos[Math.floor(Math.random()*this.videos.length)];
    $('.myiframe').attr("src", oneVid);

    setTimeout(() => {
      $('.myiframe, #closeiframe').fadeIn(400);
    }, 200);
  }

  hasSetHomePage(){
    $('.darkenBackground, .addMoodflowAsHomepage').fadeOut(500);
  }

  injectPlaceholder() {
    $('.ion-ios-search-strong').css('transform', 'translateX(300px)');

    setTimeout(() => {
      if($("#placeholder").is(":focus")) {
        $('#placeholder').attr("placeholder", "Google search");
      }
    }, 850);
  }

  removePlaceholder() {
    $('.ion-ios-search-strong').css('transform', 'translateX(0)');
    $('#placeholder').attr("placeholder", "");
    setTimeout(() => {
      $('#placeholder').attr("placeholder", "");
    }, 100)
    setTimeout(()=> {
      $('#placeholder').attr("placeholder", "");
      $('#placeholder').val('');
      $('.ion-ios-search-strong').fadeIn(300);
    }, 310)
  }

  noSearchbar() {
    if(this.user.searchbar) {
      this.user.searchbar = false;
      this.mySession.noSearchbar()
      .then(() => {
      })
      .catch((err) => {
        (err);
      })

    } else {
      this.user.searchbar = true;

      this.mySession.yesSearchbar()
      .then(() => {

      })
      .catch((err) => {
        (err);
      })
    }
  }


}
