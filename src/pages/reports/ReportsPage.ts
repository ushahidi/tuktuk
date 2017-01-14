import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './CreateReportPage';
import { SettingsPage } from '../settings';
import { ReportProvider } from '../../providers';
import { Storage } from '@ionic/storage';

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
    private reportService: ReportProvider,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    // this.reportService.fetch().then((data) => {
    //   console.info('LOADING REPORT DATA', data);
    //   this.reports = data;
    // });
  }


}
