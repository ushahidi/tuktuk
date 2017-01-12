import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { CreateReportPage } from './CreateReportPage';
import { SettingsPage } from '../settings/SettingsPage';
import { ReportProvider } from '../../providers/report-provider';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  createReport = CreateReportPage;
  reports: any;

  constructor(
    private navCtrl: NavController,
    private reportService: ReportProvider,
    public popoverCtrl: PopoverController
  ) { }

  ionViewDidLoad() {
    console.info('LOADING DATA');
    this.reportService.fetch().then((data) => {
      this.reports = data;
    });
  }

  displaySettings(event) {
    let popover = this.popoverCtrl.create(SettingsPage);
    popover.present({ ev: event });
  }

}
