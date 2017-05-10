import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.min.css']
})
export class AppComponent {

  ngOnInit() {
    setTimeout(() => {
      $('.fadeIn').fadeIn(1500);
    }, 500);
  }
}
