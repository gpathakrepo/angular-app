import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-zoomchart',
  templateUrl: './zoomchart.component.html',
  styleUrls: ['./zoomchart.component.css']
})
export class ZoomchartComponent implements OnInit, AfterViewInit {

  keys: any;
  lineKeys: any;
  graph: Object = {};
  lineData: any = { "Results": { "2013": { "1": { "approval_count": "0", "btd_count": "0" }, "10": { "approval_count": "0", "btd_count": "0" }, "11": { "approval_count": "0", "aprResults": "1", "btd_count": "1" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "btd_count": "1" }, "3": { "approval_count": "0", "btd_count": "0" }, "4": { "approval_count": "0", "btd_count": "2" }, "5": { "approval_count": "0", "btd_count": "2" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "btd_count": "0" }, "8": { "approval_count": "0", "btd_count": "0" }, "9": { "approval_count": "0", "btd_count": "2" } }, "2014": { "1": { "approval_count": "0", "btd_count": "0" }, "10": { "approval_count": "0", "btd_count": "0" }, "11": { "approval_count": "0", "btd_count": "0" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "btd_count": "0" }, "3": { "approval_count": "0", "btd_count": "0" }, "4": { "approval_count": "0", "aprResults": "1", "btd_count": "1" }, "5": { "approval_count": "0", "btd_count": "1" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "aprResults": "2", "btd_count": "1" }, "8": { "approval_count": "0", "btd_count": "0" }, "9": { "approval_count": "0", "btd_count": "0" } }, "2015": { "1": { "approval_count": "0", "aprResults": "1", "btd_count": "0" }, "10": { "approval_count": "0", "btd_count": "2" }, "11": { "approval_count": "0", "aprResults": "3", "btd_count": "2" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "aprResults": "1", "btd_count": "0" }, "3": { "approval_count": "0", "btd_count": "0" }, "4": { "approval_count": "0", "btd_count": "0" }, "5": { "approval_count": "0", "btd_count": "1" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "btd_count": "0" }, "8": { "approval_count": "0", "btd_count": "0" }, "9": { "approval_count": "0", "btd_count": "0" } }, "2016": { "1": { "approval_count": "0", "btd_count": "4" }, "10": { "approval_count": "0", "btd_count": "1" }, "11": { "approval_count": "0", "aprResults": "2", "btd_count": "0" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "aprResults": "1", "btd_count": "1" }, "3": { "approval_count": "0", "btd_count": "0" }, "4": { "approval_count": "0", "aprResults": "1", "btd_count": "0" }, "5": { "approval_count": "0", "btd_count": "1" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "btd_count": "1" }, "8": { "approval_count": "0", "btd_count": "4" }, "9": { "approval_count": "0", "btd_count": "0" } }, "2017": { "1": { "approval_count": "0", "btd_count": "2" }, "10": { "approval_count": "0", "btd_count": "2" }, "11": { "approval_count": "0", "aprResults": "1", "btd_count": "1" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "btd_count": "0" }, "3": { "approval_count": "0", "aprResults": "4", "btd_count": "0" }, "4": { "approval_count": "0", "aprResults": "1", "btd_count": "0" }, "5": { "approval_count": "0", "aprResults": "2", "btd_count": "0" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "btd_count": "1" }, "8": { "approval_count": "0", "aprResults": "1", "btd_count": "2" }, "9": { "approval_count": "0", "aprResults": "1", "btd_count": "0" } }, "2018": { "1": { "approval_count": "0", "btd_count": "0" }, "10": { "approval_count": "0", "btd_count": "1" }, "11": { "approval_count": "0", "aprResults": "1", "btd_count": "0" }, "12": { "approval_count": "0", "aprResults": "2", "btd_count": "0" }, "2": { "approval_count": "0", "aprResults": "1", "btd_count": "1" }, "3": { "approval_count": "0", "btd_count": "1" }, "4": { "approval_count": "0", "btd_count": "0" }, "5": { "approval_count": "0", "btd_count": "0" }, "6": { "approval_count": "0", "aprResults": "1", "btd_count": "3" }, "7": { "approval_count": "0", "aprResults": "3", "btd_count": "2" }, "8": { "approval_count": "0", "btd_count": "0" }, "9": { "approval_count": "0", "btd_count": "0" } }, "2019": { "1": { "approval_count": "0", "btd_count": "1" }, "10": { "approval_count": "0", "btd_count": "0" }, "11": { "approval_count": "0", "btd_count": "0" }, "12": { "approval_count": "0", "btd_count": "0" }, "2": { "approval_count": "0", "btd_count": "1" }, "3": { "approval_count": "0", "btd_count": "1" }, "4": { "approval_count": "0", "btd_count": "0" }, "5": { "approval_count": "0", "btd_count": "0" }, "6": { "approval_count": "0", "btd_count": "0" }, "7": { "approval_count": "0", "btd_count": "0" }, "8": { "approval_count": "0", "btd_count": "0" }, "9": { "approval_count": "0", "btd_count": "0" } } } }


  constructor(public rest: RestService) { }

  ngOnInit() {

    this.loadChart();
    this.loadLineChart();


    // var data = {
    //   labels: [
    //     "Novartis Pharmaceuticals Corp.", "Genentech Inc.", "Bristol-Myers Squibb Company", "Pfizer Inc.", "Merck Sharp & Dohme Corp.", "Vertex Pharmaceuticals Inc.", "Novartis", "AstraZeneca", "AbbVie Inc.", "Pharmacyclics LLC", "Merck", "Gilead Sciences Inc.", "Shire", "Janssen Biotech Inc.", "Loxo Oncology, Inc.", "BMS", "Hoffman-La Roche Inc.", "Eli Lilly and Co.", "Sanofi/Genzyme", "GlaxoSmithKline", "Regeneron Pharmaceuticals Inc.", "Boehringer Ingelheim Pharmaceuticals Inc.", "Genentech/Roche", "Acadia Pharmaceuticals Inc.", "Boehringer Ingelheim", "Spark Therapeutics Inc.", "PF Prism CV", "Clovis Oncology", "AstraZeneca UK Ltd.", "Roche", "Alnylam Pharmaceuticals, Inc.", "Sage Therapeutics", "Kyowa Kirin, Inc.", "Seattle Genetics Inc.", "Daiichi Sankyo", "Regeneron/Sanofi", "Y-mAbs Therapeutics, Inc.", "Pfizer", "Aduro", "Altara Biotherapeutics Inc.", "Spark Therapeutics", "Syndax", "Alexion Pharmaceuticals Inc.", "Portola Pharmaceuticals, Inc.", "Catalyst", "Synageva Biopharma Corp.", "Novartis Vaccines and Diagnostics, Inc.", "Celldex", "Seres", "CelladonÃ‚", "J&J", "TaiMed Biologics USA Corp", "Juno Therapeutics", "Insmed", "GlaxoSmithKline/Prosensa", "Aimmune", "Atara and MSKCC", "Takeda", "Scioderm", "Clovis", "AstraZeneca Pharmaceuticals LP", "Alexion", "Intercept", "Ariad", "Ariad Pharmaceuticals Inc.", "Amgen Inc.", "Wellstat Therapeutics Corp.", "Vertex", "Dyax", "DBV", "Janssen Pharmaceuticals, Inc.", "BlueBird", "Neurocrine Biosciences Inc.", "BeiGene, Ltd.", "NeuroRx", "uniQure N.V.", "Omeros Corporation", "Dompe farmaceutici", "Abeona Therapeutics Inc", "Axsome Therapeutics, Inc.", "MorpoSys", "Eiger BioPharmaceuticals", "COMPASS Pathways", "Concentric Analgesics, Inc.", "Bioverativ Inc.", "Ansun BioPharma", "Johnson & Johnson", "CymaBay Therapeutics", "Abbvie", "Celgene Corporation", "UroGen Pharma", "Genentech, Inc.", "Heron Therapeutics, Inc.", "Janssen Pharmaceutical", "Harmony Biosciences", "Proteostasis Therapeutics", "Merck and Eisai", "Abbvie/Roche", "TG Therapeutics", "Bluebird bio Inc."
    //   ],
    //   series: [
    //     {
    //       label: '',
    //       values: ["20", "19", "12", "9", "3"]
    //     },
    //     {
    //       label: '',
    //       values: ["12", "9", "13", "5", "3"]
    //     }]
    // };

    // var chartWidth       = 300,
    // barHeight        = 20,
    // groupHeight      = barHeight * data.series.length,
    // gapBetweenGroups = 10,
    // spaceForLabels   = 150,
    // spaceForLegend   = 150;

    // // Zip the series data together (first values, second values, etc.)
    // var zippedData = [];
    // for (var i = 0; i < data.labels.length; i++) {
    //   for (var j = 0; j < data.series.length; j++) {
    //     zippedData.push(data.series[j].values[i]);
    //   }
    // }

    // var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    //   width = 960 - margin.left - margin.right,
    //   height = 500 - margin.top - margin.bottom;

    // var x = d3.scale.linear()
    //   .domain([-width / 2, width / 2])
    //   .range([0, width]);

    // var y = d3.scale.linear()
    //   .domain([-height / 2, height / 2])
    //   .range([height, 0]);

    // var color = d3.scale.category20();

    // var xAxis = d3.svg.axis()
    //   .scale(x)
    //   .orient("bottom")
    //   .tickSize(-height);

    // var yAxis = d3.svg.axis()
    //   .scale(y)
    //   .orient("left")
    //   .ticks(5)
    //   .tickSize(-width);

    // var zoom = d3.behavior.zoom()
    //   .x(x)
    //   .y(y)
    //   .scaleExtent([1, 10])
    //   .center([width / 2, height / 2])
    //   .size([width, height])
    //   .on("zoom", zoomed);

    // var chart = d3.select(".chart")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //   .call(zoom);

    // chart.append("rect")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .style('fill', function (d, i) { return color(i); })

    // chart.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis);

    // chart.append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis);


    // // Create bars
    // var bar = chart.selectAll("g")
    //   .data(zippedData)
    //   .enter().append("g")
    //   .attr("transform", function (d, i) {
    //     return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
    //   });

    // // Create rectangles of the correct width
    // bar.append("rect")
    //   .attr("fill", function (d, i) { return color(i % data.series.length); })
    //   .attr("class", "bar")
    //   .attr("width", x)
    //   .attr("height", barHeight - 1);

    // // Add text label in bar
    // bar.append("text")
    //   .attr("x", function (d) { return x(d) - 3; })
    //   .attr("y", barHeight / 2)
    //   .attr("fill", "red")
    //   .attr("dy", ".35em")
    //   .text(function (d) { return d; });

    // // Draw labels
    // bar.append("text")
    //   .attr("class", "label")
    //   .attr("x", function (d) { return - 10; })
    //   .attr("y", groupHeight / 2)
    //   .attr("dy", ".35em")
    //   .text(function (d, i) {
    //     if (i % data.series.length === 0)
    //       return data.labels[Math.floor(i / data.series.length)];
    //     else
    //       return ""
    //   });

    // d3.selectAll("button[data-zoom]")
    //   .on("click", clicked);


    // function zoomed() {
    //   chart.select(".x.axis").call(xAxis);
    //   chart.select(".y.axis").call(yAxis);
    // }

    // function clicked() {
    //   chart.call(zoom.event); // https://github.com/mbostock/d3/issues/2387

    //   // Record the coordinates (in data space) of the center (in screen space).
    //   var center0 = zoom.center(), translate0 = zoom.translate(), coordinates0 = coordinates(center0);
    //   zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("data-zoom")));

    //   // Translate back to the center.
    //   var center1 = point(coordinates0);
    //   zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

    //   chart.transition().duration(750).call(zoom.event);
    // }

    // function coordinates(point) {
    //   var scale = zoom.scale(), translate = zoom.translate();
    //   return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
    // }

    // function point(coordinates) {
    //   var scale = zoom.scale(), translate = zoom.translate();
    //   return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
    // }

    // var data = {
    //   labels: [
    //     "Novartis Pharmaceuticals Corp.", "Genentech Inc.", "Bristol-Myers Squibb Company", "Pfizer Inc.", "Merck Sharp & Dohme Corp.", "Vertex Pharmaceuticals Inc.", "Novartis", "AstraZeneca", "AbbVie Inc.", "Pharmacyclics LLC", "Merck", "Gilead Sciences Inc.", "Shire", "Janssen Biotech Inc.", "Loxo Oncology, Inc.", "BMS", "Hoffman-La Roche Inc.", "Eli Lilly and Co.", "Sanofi/Genzyme", "GlaxoSmithKline", "Regeneron Pharmaceuticals Inc.", "Boehringer Ingelheim Pharmaceuticals Inc.", "Genentech/Roche", "Acadia Pharmaceuticals Inc.", "Boehringer Ingelheim", "Spark Therapeutics Inc.", "PF Prism CV", "Clovis Oncology", "AstraZeneca UK Ltd.", "Roche", "Alnylam Pharmaceuticals, Inc.", "Sage Therapeutics", "Kyowa Kirin, Inc.", "Seattle Genetics Inc.", "Daiichi Sankyo", "Regeneron/Sanofi", "Y-mAbs Therapeutics, Inc.", "Pfizer", "Aduro", "Altara Biotherapeutics Inc.", "Spark Therapeutics", "Syndax", "Alexion Pharmaceuticals Inc.", "Portola Pharmaceuticals, Inc.", "Catalyst", "Synageva Biopharma Corp.", "Novartis Vaccines and Diagnostics, Inc.", "Celldex", "Seres", "CelladonÃ‚", "J&J", "TaiMed Biologics USA Corp", "Juno Therapeutics", "Insmed", "GlaxoSmithKline/Prosensa", "Aimmune", "Atara and MSKCC", "Takeda", "Scioderm", "Clovis", "AstraZeneca Pharmaceuticals LP", "Alexion", "Intercept", "Ariad", "Ariad Pharmaceuticals Inc.", "Amgen Inc.", "Wellstat Therapeutics Corp.", "Vertex", "Dyax", "DBV", "Janssen Pharmaceuticals, Inc.", "BlueBird", "Neurocrine Biosciences Inc.", "BeiGene, Ltd.", "NeuroRx", "uniQure N.V.", "Omeros Corporation", "Dompe farmaceutici", "Abeona Therapeutics Inc", "Axsome Therapeutics, Inc.", "MorpoSys", "Eiger BioPharmaceuticals", "COMPASS Pathways", "Concentric Analgesics, Inc.", "Bioverativ Inc.", "Ansun BioPharma", "Johnson & Johnson", "CymaBay Therapeutics", "Abbvie", "Celgene Corporation", "UroGen Pharma", "Genentech, Inc.", "Heron Therapeutics, Inc.", "Janssen Pharmaceutical", "Harmony Biosciences", "Proteostasis Therapeutics", "Merck and Eisai", "Abbvie/Roche", "TG Therapeutics", "Bluebird bio Inc."
    //   ],
    //   series: [
    //     {
    //       label: '',
    //       values: ["20", "19", "12", "9", "3"]
    //     },
    //     {
    //       label: '',
    //       values: ["12", "9", "13", "5", "3"]
    //     }]
    // };

    // var chartWidth = 300,
    //   barHeight = 20,
    //   groupHeight = barHeight * data.series.length,
    //   gapBetweenGroups = 10,
    //   spaceForLabels = 150,
    //   spaceForLegend = 150;

    // // Zip the series data together (first values, second values, etc.)
    // var zippedData = [];
    // for (var i = 0; i < data.labels.length; i++) {
    //   for (var j = 0; j < data.series.length; j++) {
    //     zippedData.push(data.series[j].values[i]);
    //   }
    // }

    // // Color scale
    // var color = d3.scale.category20();
    // var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

    // var x = d3.scale.linear()
    //   .domain([0, d3.max(zippedData)])
    //   .range([0, chartWidth]);

    // var y = d3.scale.linear()
    //   .range([chartHeight + gapBetweenGroups, 0]);

    // var xAxis = d3.svg.axis()
    //   .scale(x)

    // var yAxis = d3.svg.axis()
    //   .scale(y)
    //   .tickFormat('')
    //   .tickSize(0)
    //   .orient("left");

    // // Specify the chart area and dimensions
    // var chart = d3.select(".chart")
    //   .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    //   .attr("height", chartHeight);
    // // Create bars
    // var bar = chart.selectAll("g")
    //   .data(zippedData)
    //   .enter().append("g")
    //   .attr("transform", function (d, i) {
    //     return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
    //   });

    // // Create rectangles of the correct width
    // bar.append("rect")
    //   .attr("fill", function (d, i) { return color(i % data.series.length); })
    //   .attr("class", "bar")
    //   .attr("width", x)
    //   .attr("height", barHeight - 1);

    // // Add text label in bar
    // bar.append("text")
    //   .attr("x", function (d) { return x(d) - 3; })
    //   .attr("y", barHeight / 2)
    //   .attr("fill", "red")
    //   .attr("dy", ".35em")
    //   .text(function (d) { return d; });

    // // Draw labels
    // bar.append("text")
    //   .attr("class", "label")
    //   .attr("x", function (d) { return - 10; })
    //   .attr("y", groupHeight / 2)
    //   .attr("dy", ".35em")
    //   .text(function (d, i) {
    //     if (i % data.series.length === 0)
    //       return data.labels[Math.floor(i / data.series.length)];
    //     else
    //       return ""
    //   });

    // chart.append("g")
    //   .attr("class", "y axis")
    //   .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
    //   .call(yAxis);

    // // Draw legend
    // var legendRectSize = 18,
    //   legendSpacing = 4;

    // var legend = chart.selectAll('.legend')
    //   .data(data.series)
    //   .enter()
    //   .append('g')
    //   .attr('transform', function (d, i) {
    //     var height = legendRectSize + legendSpacing;
    //     var offset = -gapBetweenGroups / 2;
    //     var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
    //     var vert = i * height - offset;
    //     return 'translate(' + horz + ',' + vert + ')';
    //   });

    // legend.append('rect')
    //   .attr('width', legendRectSize)
    //   .attr('height', legendRectSize)
    //   .style('fill', function (d, i) { return color(i); })
    //   .style('stroke', function (d, i) { return color(i); });

    // legend.append('text')
    //   .attr('class', 'legend')
    //   .attr('x', legendRectSize + legendSpacing)
    //   .attr('y', legendRectSize - legendSpacing)
    //   .text(function (d) { return d.label; });





  }

  public ngAfterViewInit() {

  }

  public loadChart() {
    this.rest.getBarChartData("indication=Neoplasms&drugClass=Antibody").subscribe((res: Observable<any[]>) => {
      var jsonstr = JSON.stringify(res);
      var obj = JSON.parse(jsonstr);
      this.prepareData(obj);
    });
  }

  prepareData(obj) {
    var btdCount = [], approvedCount = [];
    this.keys = Object.keys(obj.Results);
    Object.values(obj.Results).forEach(data => { btdCount.push(data['btd_count']); approvedCount.push(data['approval_count']); });
    this.loadGraph(this.keys, btdCount, approvedCount)

  }

  loadLineChart() {
    var data = this.lineData;
    this.lineKeys = Object.keys(data.Results);
    //this.loadLineGraph(this.lineKeys,);
  }

  // loadLineGraph(keys, values1, values2) {
  //   this.graph = {
  //     data: [{
  //       y: keys,
  //       x: values1,
  //       name: 'Approved',
  //       type: 'bar',
  //       orientation: 'h'
  //     },
  //     {
  //       y: keys,
  //       x: values2,
  //       name: 'BTD',
  //       type: 'bar',
  //       orientation: 'h'
  //     }],
  //     layout: {
  //       xaxis: {
  //         title: 'Number of Drugs',
  //         zeroline: true
  //       },
  //       yaxis: {
  //         title: '',
  //         zeroline: true,
  //         automargin: true
  //       },
  //       barmode: 'group'
  //     }
  //   };

  // }




  loadGraph(keys, values1, values2) {
    this.graph = {
      data: [{
        y: keys,
        x: values1,
        name: 'Approved',
        type: 'bar',
        orientation: 'h'
      },
      {
        y: keys,
        x: values2,
        name: 'BTD',
        type: 'bar',
        orientation: 'h'
      }],
      layout: {
        height: keys.length * 50,
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

}
