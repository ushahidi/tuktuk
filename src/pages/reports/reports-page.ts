import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { CreateReportPage } from './create-report-page';
import { SettingsPage } from '../settings';
import { DataService } from '../../providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  createReport = CreateReportPage;
  settings = SettingsPage;
  reports: any;
  isThaliPeerRunning: boolean;

  constructor(
    public nav: NavController,
    private data: DataService,
    private configs: Storage,
  ) { }

  ionViewDidEnter() {
    this.configs.get('isThaliPeerRunning')
    .then((isThaliPeerRunning) => {
      this.isThaliPeerRunning = isThaliPeerRunning;
    })
    
    this.data.fetch()
    .then((reports) => {
      console.log('FETCH REPORTS', reports);
      this.reports = reports;
    });

  }

  doRefresh(refresher:Refresher) {
    setTimeout(() => {
      this.data.fetch()
      .then((reports) => {
        console.log('FRESH REPORTS', reports);
        this.reports = reports;
      });
      refresher.complete();
    }, 2000);


  }

}
