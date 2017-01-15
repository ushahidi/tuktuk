import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './create-report-page';
import { SettingsPage } from '../settings';
import { ReportProvider, ThaliProvider } from '../../providers';

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
    private thaliProvider: ThaliProvider,
  ) {}

  ionViewDidEnter() {
    this.reportProvider.fetch().then((reports) => {
      this.thaliProvider.loader.dismiss()
      console.info('FETCH REPORTS', reports);
      this.reports = reports;
    });
  }
}
