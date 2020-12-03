import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../rest.service';
import { Observable, of } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PlotlyModule } from 'angular-plotly.js';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';

declare const Treemap: any;

@Component({
  selector: 'app-btd-chart-dashboard',
  templateUrl: './btd-chart-dashboard.component.html',
  styleUrls: ['./btd-chart-dashboard.component.css']
})
export class BtdChartDashboardComponent implements OnInit, AfterViewInit {

  app = [];
  approvedObj: Object = {};
  approvedCount = [];
  btd = [];
  btdObj: Object = {};
  barBtd = [];
  barApp = [];
  btdCount = [];
  count: number = 0;
  candleStick: Object = {};
  data = [];
  graph: Object = {};
  keys: any;
  keyLegend: any;
  lcl = [];
  linegraph: Object = {};
  lineValues: any;


  constructor(public rest: RestService, private spinnerService: Ng4LoadingSpinnerService) { }

  @ViewChild('barChart') barChart: any;
  @ViewChild('lineChart') lineChart: any;

  ngOnInit() {
    this.onChange();
  }

  public lineKeys = [];
  prepareData(chartType: string, key: string, value: string) {
    if (chartType == 'line') {

      if (key.length == 4) {
        this.lineKeys.push(key);
      } else if (key == 'btd_count') {
        this.btd.push(value);
      } else if (key == 'approval_count') {
        this.app.push(value);
      } else if (key.length <= 2) {
        this.lcl.push(key + "/" + this.lineKeys);
      }
      //this.loadLineGraph(this.lineKeys, this.btd, this.app)

    }

  }
  public ngAfterViewInit() {

  }

  public indicationDropdown;
  public centerDropdown;
  public durgclassDropdown;

  public onChange() {
    this.barBtd.length = 0;
    this.barApp.length = 0;
    //this.barChartLabels1.length = 0;
    this.btd.length = 0;
    this.app.length = 0;
    this.lcl.length = 0;
    this.indicationDropdown = document.getElementById("indication");
    //this.centerDropdown = document.getElementById("center");
    this.durgclassDropdown = document.getElementById("drugclass");

    var paramBar = "indication=" + this.indicationDropdown.value;
    var paramLine = "drugClass=" + this.durgclassDropdown.value;
    //var paramTree = "center=" + this.centerDropdown.selectedOptions[0].firstChild.data
    this.populateChart(paramBar + "&" + paramLine);//+"&"+paramTree);

  }

  public populateChart(obj1: any) {    
    this.spinnerService.show();
    this.rest.getBarChartData(obj1).subscribe((res: Observable<any[]>) => {
      var jsonstr = JSON.stringify(res);
      var obj = JSON.parse(jsonstr);
      this.prepareGraph(obj, 'bar');      
      this.spinnerService.hide();
    });

    this.rest.getLineChartData(obj1).subscribe((res: Observable<any[]>) => {
      var jsonstr = JSON.stringify(res);
      var obj = JSON.parse(jsonstr);
      this.prepareLineGraph(obj, 'line');
      this.data = [];           
      this.spinnerService.hide();
    });

    this.candleStickGraph();

  }

  prepareLineGraph(obj, type) {
    for (let [key, value] of Object.entries(obj.Results)) {
      this.lineKeys.push(key);
      var getValues = value;
      for (var k in getValues) {
        if (getValues.hasOwnProperty(k)) {
          this.approvedCount.push(getValues[k].approval_count);
          this.btdCount.push(getValues[k].btd_count);
        }
        this.keyLegend = key;
        this.btdObj = {
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          y: this.btdCount,
          type: "scatter",
          name: 'BTD' + '_' + this.keyLegend
        }
        this.approvedObj = {
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          y: this.approvedCount,
          type: "scatter",
          name: 'Approved' + '_' + this.keyLegend
        }
      }
      this.data.push(this.btdObj);
      this.data.push(this.approvedObj);
      this.loadLineGraph(this.data);
    }

  }

  loadLineGraph(data) {
    this.linegraph = {
      data: data,
      layout: {
        xaxis: {
          title: '',
          zeroline: true
        },
        yaxis: {
          title: '',
          automargin: true
        }
      }
    };

  }

  prepareGraph(obj, bar) {
    var btdCount = [], approvedCount = [];
    this.keys = Object.keys(obj.Results);
    Object.values(obj.Results).forEach(data => { btdCount.push(data['btd_count']); approvedCount.push(data['approval_count']); });
    this.loadBarGraph(this.keys, btdCount, approvedCount, bar)
  }

  loadBarGraph(keys, values1, values2, type) {
    this.graph = {
      data: [{
        y: keys,
        x: values1,
        name: 'Approved',
        type: type,
        orientation: 'h'
      },
      {
        y: keys,
        x: values2,
        name: 'BTD',
        type: type,
        orientation: 'h'
      }],
      layout: {
        height: keys.length * 60,
        xaxis: {
          title: 'Number of Drugs',
          zeroline: true
        },
        yaxis: {
          title: '',
          automargin: true
        },
        barmode: 'group'
      }
    };

  }

  checkNested(obj1: object, chartType: string) {
    var key: string;
    var value: string;
    for (let prop in obj1) {
      if (obj1.hasOwnProperty(prop)) {
        if (typeof obj1[prop] == "object") {
          this.count++;
          key = `${prop}`;
          this.prepareData(chartType, key, value);
          this.checkNested(obj1[prop], chartType);
        } else {
          key = `${prop}`;
          value = `${obj1[prop]}`;
          this.count = 0;
          this.prepareData(chartType, key, value);
        }

      }
    }
  }

  candleStickGraph() {
    this.candleStick = {
      data: [{
        y: ['BTD', 'Non-BTD'],
        close: [500, 200],
        decreasing: { line: { color: '#7F7F7F' } },
        high: [750, 500],
        increasing: { line: { color: '#17BECF' } },
        line: { color: '#b9bbbd' },
        low: [120, 90],
        open: [300, 150],
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }],
      layout: {
        dragmode: 'zoom',
        xaxis: {
          autorange: true,
          rangeslider: {
            visible: false
          },
          title: 'Review Days',
        },
        yaxis: {
          type: 'linear'
        }
      }
    };
  }

  public keyLabel = [];
  public keyValueLen = [];
  public keyValueTotal = [];
  public keyValueSum = 0;
  prepareTreeMapData(obj1:Object){
    var key: string;
    var value: string;
    for (let prop in obj1) {
      if (obj1.hasOwnProperty(prop)) {
        if (typeof obj1[prop] == "object") {
          console.log("ifffff "+this.count);
          if(this.count != 0){
          //  console.log(" 1111 "+this.keyValueSum );
            this.keyValueLen.push(this.count );
           console.log(" keyv "+this.keyValueSum );
            this.keyValueTotal.push(this.keyValueSum );
          }
          this.keyValueSum = 0;
          this.count = 0;
          key = `${prop}`;
          value = `${obj1[prop]}`;
          //console.log(key+" vvv "+value+" count "+value);
          this.keyLabel.push(key);
          
          this.prepareTreeMapData(obj1[prop]);
        } else {
         console.log("elseeeee  "+this.count);
          key = `${prop}`;
          value = `${obj1[prop]}`;
          if(Number(value)){
            console.log(key+" if "+value+" count "+this.count);
           
            this.count++;
           
            this.maxVal+=Number.parseFloat(value);
            this.keyValueSum+=Number.parseFloat(value);
            this.valueLabel.push(key);
            this.values.push(Number.parseFloat(value));
        //    console.log("kkkkk "+this.keyValueSum);
          }
          
        }
      }
    }
    if(this.keyValueLen.length ==0 || 
    this.keyValueTotal.length ==0 ){
      this.keyValueLen.push(this.count );
      this.keyValueTotal.push(this.keyValueSum);
    }
  } 

  public shapes = [];
  public annotations = [];

  

// declaring arrays

public treeData =JSON.parse('{"Description": "Therapeutic areas classified by the clinical classification system (CCS) and mapped using ICD10CM codes.", "Neoplasms": {"Cancer of lymphatic and hematopoietic tissue": "50", "Cancer of breast": "26", "Other gastrointestinal cancer": "10", "Cancer of skin": "4", "Colorectal cancer": "3", "Cancer; other primary": "1", "Cancer of bronchus; lung": "1"}, "Endocrine; nutritional; and metabolic diseases and immunity disorders": {"Cystic fibrosis": "48", "Other nutritional; endocrine; and metabolic disorders": "11", "Nutritional deficiencies": "8", "Other endocrine disorders": "3"}, "Mental Illness": {"Mood disorders": "28", "Alcohol-related disorders": "6", "Disorders usually diagnosed in infancy childhood or adolescence": "2", "Miscellaneous mental disorders": "1", "Suicide and intentional self-inflicted injury": "1"}, "Diseases of the nervous system and sense organs": {"Hereditary and degenerative nervous system conditions": "22", "Other nervous system disorders": "19"}, "Symptoms; signs; and ill-defined conditions and factors influencing health status": {"Symptoms; signs; and ill-defined conditions": "20"}, "Diseases of the blood and blood-forming organs": {"Anemia": "15", "Diseases of white blood cells": "4"}, "Diseases of the respiratory system": {"Asthma": "15", "Other lower respiratory disease": "8", "Respiratory infections": "2"}, "Diseases of the circulatory system": {"Diseases of the heart": "12"}, "Diseases of the digestive system": {"Liver disease": "7", "Upper gastrointestinal disorders": "1", "Diseases of mouth; excluding dental": "1"}, "Infectious and parasitic diseases": {"Other infections; including parasitic": "6", "Viral infection": "3", "Bacterial infection": "3"}, "Diseases of the genitourinary system": {"Diseases of the urinary system": "4"}, "Congenital anomalies": {"Other congenital anomalies": "4"}, "Diseases of the skin and subcutaneous tissue": {"Other skin disorders": "3", "Other inflammatory condition of skin": "1"}, "Diseases of the musculoskeletal system and connective tissue": {"Systemic lupus erythematosus and connective tissue disorders": "2"}, "Injury and poisoning": {"Complications": "2"}}');

// For Hover Text
public x_trace = [];
public y_trace = [];
public hoverText = [];

//colors
public colors = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)'];

// Generate Rectangles using Treemap-Squared
public maxVal = 0;
public values =[];
public values1 = [500, 433, 78, 25, 25, 7];
public valueLabel = [];
public rectangles = [];
public bigRectangles = [];

public treegraph = {};

prepareTreeGraph(obj) {
  this.maxVal = 0;
  this.prepareTreeMapData(obj);
  this.maxVal = this.maxVal;
  console.log(this.keyValueTotal+" mm "+this.maxVal+" vlll "+this.values );
  this.bigRectangles = Treemap.generate(this.keyValueTotal, this.maxVal/2, this.maxVal/2);
  this.rectangles = Treemap.generate(this.values, this.maxVal/2, this.maxVal/2);
  this.bigRectangles.forEach((element, index) => {
    console.log(element[0]+" 333 "+element[3]);
    var shape = {
      type: 'rect',
      x0: element[0],
      y0: element[1],
      x1: element[2],
      y1: element[3],
      line: {
          width: 2
        },
      fillcolor: '#'+Math.floor(Math.random()*16777215).toString(16)
    };
    this.shapes.push(shape);
    var annotation = {
        x: (element[0] + element[2]) / 2,
        y: (element[1] + element[3]) / 2,
        text: String(this.keyLabel[index]),
        showarrow: false
    };
	  this.annotations.push(annotation);
  });
  this.rectangles.forEach((element, index) => {
    var shape = {
      type: 'rect',
      x0: element[0],
      y0: element[1],
      x1: element[2],
      y1: element[3],
      line: {
          width: 2
        },
      fillcolor: '#'+Math.floor(Math.random()*16777215).toString(16)
    };
    this.shapes.push(shape);
    var annotation = {
        x: (element[0] + element[2]) / 2,
        y: (element[1] + element[3]) / 2,
        text: String(this.valueLabel[index]),
        showarrow: false
    };
	  this.annotations.push(annotation);
  });
  // var trace0 = {
  //   x: this.x_trace,
  //   y: this.y_trace,
  //   text: this.hoverText,
  //   mode: 'text',
  //   type: 'scatter'
  // };
  
  this.treegraph = { data:[
    {
      mode: "text", 
      name: "y", 
      text: ["500", "433", "78", "25", "25", "7"], 
      textsrc: "tarzzz:616:bafb6b", 
      type: "scatter", 
      xsrc: "tarzzz:616:512d04", 
      ysrc: "tarzzz:616:da6e5c"
    }
  ],
   layout: {
    annotations: this.annotations, 
    hovermode: "closest", 
    shapes: this.shapes, 
      
    xaxis: {
      showgrid: false, 
      zeroline: false
    }, 
    yaxis: {
      showgrid: false, 
      zeroline: false
    }
  }
  };
}

}
