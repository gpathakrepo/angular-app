import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BtdChartDashboardComponent } from './btd-chart-dashboard/btd-chart-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntelagentcomponentComponent } from './intelagentcomponent/intelagentcomponent.component';
import { TabcomponentComponent } from './tabcomponent/tabcomponent.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { ZoomchartComponent } from './zoomchart/zoomchart.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;


const routes: Routes = [
  { path: 'btd-dashboard', component: BtdChartDashboardComponent },
  { path: 'intelagent-dashboard', component: IntelagentcomponentComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    BtdChartDashboardComponent,
    LoginComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    IntelagentcomponentComponent,
    TabcomponentComponent,
    BarchartComponent,
    LinechartComponent,
    ZoomchartComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    HttpClientModule,
    NgbModule,    
    FormsModule,
    PlotlyModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
