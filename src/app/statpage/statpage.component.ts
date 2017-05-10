import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { MomentModule } from 'angular2-moment';
import { AuthserviceService } from '../my-services/authservice.service';


@Component({
  selector: 'app-statpage',
  templateUrl: './statpage.component.html',
  styleUrls: ['./statpage.component.min.css']
})
export class StatpageComponent implements OnInit { //, OnChanges
  @Input()
  isDataTime: Boolean;

  public now = new Date();
  public today: Date = new Date;

  public dayOfCurrentMonth = new Date().getDate();
  public daysInCurrentMonth = new Date(this.now.getFullYear(), this.now.getMonth()+1, 0).getDate();

  public arrayWithDays: Array<any>;
  public monthNames: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public currentMonth = this.now.getMonth();


  public moodInfoHolder: any;
  public myData: Array<number> = []; //= [4, 5, 7, 6, 5, 6, 7, 8, 9, 6, 6, 7, 8, 9, 7, 6, 5, 4, 4, 5, 8, 9, 7, 7, 6, 7, 6, 5, 7, 8, 8];
  public myNewData: Array<Object> = []; //= [4, 5, 7, 6, 5, 6, 7, 8, 9, 6, 6, 7, 8, 9, 7, 6, 5, 4, 4, 5, 8, 9, 7, 7, 6, 7, 6, 5, 7, 8, 8];
  public myAverage: any;


  constructor(private mySession: AuthserviceService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!this.isDataTime) {
      return;
    }
    this.mySession.getMoodInfo()
      .then(myResult => {
        this.convertData(myResult);
        console.log(this.myNewData);

        this.moodInfoHolder = myResult;

        this.generateData(myResult);
       });
  }

  public lineChartData:Array<any> = [
    {
      data: this.myNewData,
      label: 'Mood',
      backgroundColor: 'transparent',
      pointRadius: 5,
      pointHoverRadius: 8
    }
   ];
   public lineChartLabels:Array<any>;

  public lineChartOptions:any = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 400,
      easing: 'easeInOutQuart'
    },
    tooltips: {
      bodyFontSize: 10,
      titleFontSize: 10,
      footerFontSize: 10,
      callbacks: {
        title: (tooltipItem, data) =>{

          console.log(tooltipItem[0].xLabel);
          let now = new Date();
          let myArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let currentMonth = now.getMonth();

          return myArray[currentMonth] + ', ' + tooltipItem[0].xLabel;

        },
        beforeLabel: (tooltipItems, data) => {
          let comment;

          if (this.moodInfoHolder[tooltipItems.index]) {
            comment = this.moodInfoHolder[tooltipItems.index].moodComment;
          } else {
            comment = '';
          }

          return ['', comment, ''];
        },
        label: (tooltipItems, data) => {
          return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' / 10';
        }
      }
    },
    legend: {
      display: false,
      labels: {
          fontColor: 'white'
      }
    },
    scales: {
            xAxes: [{

              gridLines:{
                color:"rgba(255,255,255,0.0)",
                zeroLineColor:"rgba(255,255,255,0.05)"
              },
              ticks: {
                  fontColor: "white",
                  beginAtZero:true,
                  max: this.daysInCurrentMonth,
                  fixedStepSize: 1
                },
                type: 'linear',
                position: 'bottom'
            }],
            yAxes: [{
              gridLines:{
                color:"rgba(255,255,255,0.0)",
                zeroLineColor:"rgba(255,255,255,0.5)"
              },
              ticks: {
                  fontColor: "rgba(200, 200, 200, 0.25)",
                  beginAtZero:true,
                  max: 10,
                  fixedStepSize: 1
                },
                type: 'linear',
            }],
        }

    };

   public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(247,218,13, 0.5)',
      borderColor: 'gold',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'black'
    }
   ];

  //  public lineChartData:Array<any> = [
  //    {
  //      data: this.myData,
  //      label: 'Mood',
  //      backgroundColor: 'transparent',
  //      pointRadius: 5,
  //      pointHoverRadius: 10
  //    }
  //  ];
   //
  //  public lineChartLabels:Array<any> = this.generateXAxis();
   //
  //  public lineChartOptions:any = {
  //    animation: {
  //      duration: 400,
  //      easing: 'easeInOutQuart'
  //    },
  //    maintainAspectRatio: false,
  //    responsive: true,
  //    tooltips: {
  //            callbacks: {
  //                title: (tooltipItem, data) =>{
   //
  //                  let now = new Date();
  //                  let myArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //                  let currentMonth = now.getMonth();
  //                  return  myArray[currentMonth] + ', ' + data.labels[tooltipItem[0].index];
  //                },
  //                beforeLabel: (tooltipItems, data) => {
  //                  let comment;
   //
  //                  if (this.moodInfoHolder[tooltipItems.index]) {
  //                    comment = this.moodInfoHolder[tooltipItems.index].moodComment;
  //                  } else {
  //                    comment = '';
  //                  }
   //
  //                  return ['', comment, ''];
  //                },
  //                label: (tooltipItems, data) => {
  //                  return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' / 10';
  //                }
  //            }
  //        },
  //    scales: {
  //        yAxes: [{
  //            gridLines: {
  //              display: false,
  //            },
  //            ticks: {
  //                fontColor: "rgba(200, 200, 200, 0.4)",
  //                max: 10,
  //                min: 0,
  //                stepSize: 1
  //            }
  //        }],
  //        xAxes: [{
  //            gridLines: {
  //              display: false,
  //            },
  //            ticks: {
  //                fontColor: "white",
  //            }
  //        }],
  //    },
  //    legend: {
  //            display: false,
  //            labels: {
  //                fontColor: 'white'
  //            }
  //        }
  //  };
   //
  //  public lineChartColors:Array<any> = [
  //    {
  //      backgroundColor: 'rgba(247,218,13, 0.5)',
  //      borderColor: 'gold',
  //      pointBackgroundColor: 'rgba(255,255,255,1)',
  //      pointBorderColor: '#fff',
  //      pointHoverBackgroundColor: '#fff',
  //      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //    }
  //  ];

   public lineChartLegend:boolean = true;

   public lineChartType:string = 'line';

   // events
   public chartClicked(e:any):void {
     //console.log(e);
   }

   public chartHovered(e:any):void {
     //console.log(e);
   }

  public convertData(apiResult) {
    // This function should return an Array of Objects.
    // Those objects should have two keys: X and Y. X being the current day
    // and Y the moodValue for that specific day.
    let x;
    let y;

    for(let i = 0; i < apiResult.length; i++ ) {

      let myObj = {
        x: apiResult[i].moodDay,
        y: apiResult[i].moodValue
      }

      this.myNewData.push(myObj);
    }

  }


  // public function(){
  //   var d = new Date;
  //   (d.getFullYear(), d.getMonth()+1, 0);
  //   return d.getDate();
  // }
  //
  // public generateXAxis() {
  //   let arrayHolder = [];
  //
  //   for(let i = 1; i <= this.daysInCurrentMonth; i++) {
  //     arrayHolder.push(i.toString());
  //   }
  //    return arrayHolder;
  // }

  public generateData(anargumant) {
    var sum = 0;

    for(let i = 0; i < anargumant.length; i++) {
      this.myData.push(anargumant[i].moodValue);
      sum = sum + anargumant[i].moodValue
    }

    this.myAverage = Math.round((sum/anargumant.length) * 100)/100
  }
  //
  // fetchData() {
  //   this.mySession.getMoodInfo()
  //   .then(myResult => {
  //     this.moodInfoHolder = myResult;
  //
  //     this.generateData(myResult);
  //    });
  // }

}
