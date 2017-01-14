import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './CreateReportPage';
import { SettingsPage } from '../settings';
import { ReportProvider } from '../../providers';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  createReport = CreateReportPage;
  settings = SettingsPage;
  reports: any;

  constructor(
    private navCtrl: NavController,
    private reportProvider: ReportProvider,
  ) {}

  ionViewDidEnter() {
    this.reportProvider.fetch().then((reports) => {
      console.info('FETCH REPORTS', reports);
      this.reports = reports;
    });
  }
}
