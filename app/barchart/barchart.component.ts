import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() labels: any;
  @Input() dataSet: any;
  @ViewChild('barChart') barChart: any;



  public barChartLabels: Label[] = this.labels;
  public barChartType: ChartType = 'horizontalBar';

  public barChartData: ChartDataSets[] = this.dataSet;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales:
    {
      yAxes:
        [{
          gridLines:
          {
            drawBorder: false,
            display: false
          }
        }],
      xAxes:
        [
          {
            ticks:
            {
              display: true,
              beginAtZero: true,
              max: 10
            },
            gridLines:
            {
              display: true,
              drawBorder: true,
            }
          }]
    }

  };

  public chartColors = [
    { // blue
      backgroundColor: 'rgb(0,0,255,0.6)',
      borderColor: 'rgb(0,0,255,0.6)',
      pointBackgroundColor: 'rgb(0,0,255,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0,0,255,0.6)'
    }
  ];

  constructor() { }


  ngOnInit() {

  }


}
