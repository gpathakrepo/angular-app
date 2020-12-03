import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  @Input() labels: any;
  @Input() dataSet: any;


  @ViewChild('lineChart') lineChart: any;

  public lineChartOptions = {
    scaleShowVerticalLines: true,
    animationEnabled: true,
    scrollBar: {
      visible: true
    },
    responsive: true,
    legend: { position: 'bottom' },
    scales:
    {
      yAxes:
        [{
          ticks:
          {
            display: true,
            beginAtZero: true,
            max: 5
          },
          gridLines:
          {
            drawBorder: true
          }
        },
        {
          id: 'y-axis-0',
          position: 'left'
        }],
      xAxes:
        [{
          ticks:
          {
            display: true,
            beginAtZero: true
          },
          gridLines:
          {
            display: true,
            drawBorder: true,
          }
        }]
    }   
  };

  public lineChartLabels = this.labels
  public lineChartType = 'line';
  public lineChartData = this.dataSet;

  constructor() { }

  ngOnInit() {

  }

}
