import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateReportPage } from './CreateReportPage';
import { ReportProvider } from '../../providers/report-provider';

@Component({
    selector: 'page-reports',
    templateUrl: 'reports.html'
})
export class ReportsPage {

    createReport = CreateReportPage;
    reports = []

    constructor(
        public navCtrl: NavController,
        private store: ReportProvider
    ) { }

    ionViewDidLoad() {
      console.info('LOADING DATA');
        // this.store
        // .getAll()
        // .then(reportsData => {
        //   console.info('REPORTS DATA',JSON.stringify(reportsData))
        //     // this.reports = reportsData;
        // });
    }

}
