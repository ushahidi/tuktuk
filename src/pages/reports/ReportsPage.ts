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
    reports = []

    constructor(
        private navCtrl: NavController,
        private store: ReportProvider,
        public popoverCtrl: PopoverController
    ) { }

    ionViewDidLoad() {
      console.info('LOADING DATA');
        // this.store
        // .fetch()
        // .then(reportsData => {
        //   console.info('REPORTS DATA',JSON.stringify(reportsData))
        //     // this.reports = reportsData;
        // });
    }

    displaySettings(event) {
      let popover = this.popoverCtrl.create(SettingsPage);
      popover.present({ ev: event });
    }

}
