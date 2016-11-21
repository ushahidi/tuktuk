import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './CreateReportPage';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  createReport = CreateReportPage;

  constructor(public navCtrl: NavController) {

  }

}
