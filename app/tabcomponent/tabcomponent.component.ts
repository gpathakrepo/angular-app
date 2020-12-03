import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { Observable, of } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export interface ITab {
  id: number;
  title: string;
}

@Component({
  selector: 'app-tabcomponent',
  templateUrl: './tabcomponent.component.html',
  styleUrls: ['./tabcomponent.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class TabcomponentComponent implements OnInit {

  @ViewChild('t') t: any;
  private idCounter: number = 1;
  barLabels: any;
  barValues: any;
  barDataSet: any;
  barGraph: Object = {};
  barData = { "Description": "Sample data.", "Results": { "Novartis Pharmaceuticals Corp.": 20, "Genentech Inc.": 12, "Bristol-Myers Squibb Company": 11, "Pfizer Inc.": 10, "Merck Sharp & Dohme Corp.": 8 } }
  currentTab: number;
  doc = new jsPDF();
  editedTab: object = {};
  lineGraph: Object = {};
  lineLabels: any;
  lineValues: any;
  lineDataSet: any;
  lineData = { "Description": "Sample data.", "Results": { "2012": 2, "2013": 2, "2014": 0, "2015": 3, "2016": 5, "2017": 2, "2018": 0, "2019": 1 } }
  tabs: any = [{ name: 'Interaction1', id: this.idCounter, active: true }];
  isHidden: Boolean = true;
  question: string = '';

  constructor(@Inject('Window') private window: Window, public rest: RestService, private modalService: NgbModal, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getTabs();
  }

  getTabs() {
    return this.tabs;
  }

  askme(value: string, index) {
    this.spinnerService.show();
    this.question = value;
    this.rest.getDataforMap(value).subscribe((res: Observable<any[]>) => {
      this.barChart(this.barData, 'bar', index);
      this.lineChart(this.lineData, 'line', index);
      this.spinnerService.hide();
    });

  }

  barChart(barData, type, index) {
    this.barLabels = Object.keys(barData.Results);
    this.barValues = Object.values(barData.Results);
    this.tabs[index]['barGraph'] = {
      data: [{
        y: this.barLabels,
        x: this.barValues,
        name: 'Approved',
        type: type,
        orientation: 'h'
      }],
      layout: {
        xaxis: {
          zeroline: true
        },
        yaxis: {
          title: '',
          zeroline: true,
          automargin: true
        }
      }
    };
  }

  lineChart(lineData, type, index) {
    this.lineLabels = Object.keys(lineData.Results);
    this.lineValues = Object.values(lineData.Results);
    this.tabs[index]['lineGraph'] = {
      data: [{
        y: this.lineValues,
        x: this.lineLabels,
        type: type
      }],
      layout: {
        xaxis: {
          title: '',
          zeroline: true
        },
        yaxis: {
          title: '',
          zeroline: true,
          automargin: true
        }
      }
    };

  }

  addNewTab(newId) {
    this.idCounter = this.idCounter + 1;
    let obj = { name: 'Interaction' + this.idCounter, id: this.idCounter, active: true }
    this.tabs.push(obj);
    this.t.select(this.idCounter - 1);
  }

  onClose(id, event) {
    event.preventDefault();
    let obj = { name: 'Interaction' + id, id: id }
    this.tabs = this.tabs.filter(function(item) {
      return item.id !== obj.id;
    });
    this.t.select(id);
  }

  openPopup(content, tab) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    this.editedTab = tab;
  }

  rename(tabName, tabId) {
    for (var i in this.tabs) {
      if (this.tabs[i].id == tabId) {
        this.tabs[i].name = tabName;
        break; //Stop this loop, we found it!
      }
    }
  }

  saveTab(tab) {
    for (var i in this.tabs) {
      if (this.tabs[i].id == tab.id) {
        this.tabs[i].active = false;
        break; //Stop this loop, we found it!
      }
    }
  }

  public exportTab(tab) {
    var data = document.getElementById('testId');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

}
