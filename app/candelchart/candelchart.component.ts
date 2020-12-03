import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-candelchart',
  templateUrl: './candelchart.component.html',
  styleUrls: ['./candelchart.component.css']
})
export class CandelchartComponent implements OnInit {

  @Input() labels: any;
  @Input() dataSet: any;


  @ViewChild('candelChart') candelChart: any;

  public candelChartOptions = {
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

  public candelChartLabels = this.labels
  public candelChartType = 'candel';
  public candelChartData = this.dataSet;

  constructor() { }

  ngOnInit() {

  }

}
