import { Component, OnInit, NgZone }      from '@angular/core';
import { AuthserviceService }     from '../my-services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';



declare var jQuery: any;
declare var $: any;
declare var ion: any;



@Component({
  selector: 'app-meditatepage',
  templateUrl: './meditatepage.component.html',
  styleUrls: ['./meditatepage.component.min.css'],
})
export class MeditatepageComponent implements OnInit {
  user: any = {
    firstName: ''
  }; // object that will contain user information OnInit

  hasMeditatedBefore = {
    createdAt: "",
    hasEverMeditated: false,
    preferedGoals: [],
    updatedAt: "",
    userId: ""
  };


  constructor(
    private mySession: AuthserviceService,
    private myRoute: ActivatedRoute,
    private myNavigator: Router,
    private zone: NgZone
  ){}


  ngOnInit() {
    $('.ion-close-round').fadeIn(2500);


    this.playMusic();
    ion.sound.play("relaxing");


    this.mySession.hasMeditatedBefore()
      .then(response => {
        this.hasMeditatedBefore = response[0];

        if(this.hasMeditatedBefore.hasEverMeditated) {
          setTimeout(() => {
            $('#typedTwo').fadeIn(500);
              setTimeout(() => {
                $('#typedTwo').fadeOut(500);
                this.startMeditation();

              }, 4000);
          }, 2000);
        } else {
          this.welcomeMessage();
        }

      });

    this.displayAll();

    this.mySession.isLoggedIn()
      .then(userInfo => {
        this.user = userInfo;
      });


  }


  // displays center and headphone warning message.
  displayAll() {
    setTimeout(() => {
      $('.center').fadeIn(1000);
    }, 1500);

    setTimeout(() => {
      $('.warning').fadeIn(500);
      setTimeout(() => {
        $('.warning').fadeOut(500, ()=> {
          $('.sponsor').fadeIn(500);
          setTimeout(() => {
            $('.sponsor').fadeOut(500);
          }, 2000)
        });
      }, 5000);
    }, 3000);
  }

  // displays typed.js welcome message if its the users first time
  welcomeMessage() {
    $(".typed").typed({
      strings: [`Welcome, ${this.user.firstName}.`, "Let me present myself...<br>^1000I have been called many names.^1000 But,...^1000 You can call me 'Doty' if you want :) .", "Since it is your first time...^1000<br> I hereby welcome you warmly^1000 to the meditation center.", `Now, ${this.user.firstName}...^1000 Meditation can be a very powerful tool^1000 if used right.<br>^1000 It has been proven to be as effective as medication in the treatment of depression and bipolarity.`, `And if you thankfully do not suffer from those diseases,^1000<br> it channels your thoughts towards the potential that lies^1000 within you.`, `Meditation helps you reflect on the problems that you are currently facing in your life^1000<br>and makes it easier for you to find the solutions.`, "Together we can realize your full potential^1000<br>and gain control of your inner emotional well-being.", "Moreover, if you find inner peace^1000<br>it will positively reflect onto other aspects of your life.", "Relax^1000, focus on your breathing^1000<br>and firstly try to think about the things you are gratefull in this life.<br>^1000", `Let us start, ${this.user.firstName}.`],
      typeSpeed: 10,
      startDelay: 2000,
      backDelay: 2000,
      fadeOut: true,
	    fadeOutClass: 'typed-fade-out',
	    fadeOutSpeed: 1000,
      showCursor: true,
	    cursorChar: "|",
      callback: () => {
        setTimeout(() => {
          this.startMeditation();

          this.mySession.nowMeditated()
            .then(response => {
          });

        }, 1500);
      }
    });
  }

  // displays typed.js welcome message if its NOT the users first time
  alreadyMeditatedMessage() {

    $("#typedTwo").typed({
      strings: [`Welcome back, ${this.user.firstName}.`, "Let us start."],
      typeSpeed: 10,
      startDelay: 2000,
      backDelay: 2000,
      fadeOut: true,
	    fadeOutClass: 'typed-fade-out',
	    fadeOutSpeed: 1000,
      showCursor: true,
	    cursorChar: "|",
    });
  }

  startMeditation() {
    $('.center').css('animation-play-state', 'running');
    $(".typed").fadeOut(500);

    setTimeout(() => {// After Meditation do this.

      $('.target').addClass('moveCenterDown');
      $('.target').css('animation-play-state', 'running');

      setTimeout(() => {
        $('.target').css('animation-play-state', 'paused');
        setTimeout(() => {
          $('.container').fadeIn(500);
          setTimeout(() => {
            $('.container').fadeOut(1000);
            $('.center').fadeOut(1000);

            setTimeout(()=> {
              this.mySession.nowMeditated()
                .then(response => {
                  console.log(response);
                });

              this.zone.run(() => {
                ion.sound.stop("relaxing");
                this.myNavigator.navigate(['home']);
              });

            }, 1000);

          }, 4000);
        }, 200);
      }, 2000);

    }, 200000);
  }


  backHome() {

    const thePromise = this.mySession.isLoggedIn();

    thePromise.then((apiRequestResult) => {
      this.user = apiRequestResult;

      (this.user);

      this.zone.run(() => {
        ion.sound.stop("relaxing");
        this.myNavigator.navigate(['home']);
      });
    });
  }

  playMusic() {

    ion.sound({
      sounds: [
          {
              name: "relaxing",
              volume: 1,
              preload: true
          }
      ],
      volume: 0.7,
      path: "assets/sounds/",
      preload: true
    });



  }

}
