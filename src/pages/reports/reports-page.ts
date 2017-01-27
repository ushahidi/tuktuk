import { Component } from '@angular/core';
import { NavController, Events, Refresher } from 'ionic-angular';
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
    public nav: NavController,
    public events: Events,
    private reportProvider: ReportProvider,
    private thaliProvider: ThaliProvider,
  ) { }

  ionViewDidEnter() {
    this.reportProvider.fetch()
    .then((reports) => {
      console.log('FETCH REPORTS', reports);
      reports.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      this.reports = reports;
    });
  }

  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.reportProvider.fetch().then((reports) => {
      console.info('FETCH REPORTS', reports);
      reports.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      this.reports = reports;
      refresher.complete();
    });
  }

}
