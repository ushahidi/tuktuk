import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './create-report-page';
import { SettingsPage } from '../settings';
import { DataService } from '../../providers';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  createReport = CreateReportPage;
  settings = SettingsPage;
  reports: any;

  constructor(
    public nav: NavController,
    private data: DataService,
  ) { }

  ionViewDidEnter() {
    this.data.fetch()
    .then((reports) => {
      console.log('FETCH REPORTS', reports);  
      this.reports = reports;
    });
  }

}
