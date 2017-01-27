import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
// import { StatusBar, Splashscreen, BackgroundMode } from 'ionic-native';
import { ReportsPage } from '../pages/reports';
import { ReportProvider, ThaliProvider } from '../providers'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Tuktuk {
  rootPage: any;

  constructor(
    public platform: Platform,
    private reportProvider: ReportProvider,
    private thaliProvider: ThaliProvider,
    private loading: LoadingController
  ) {
    platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();
      // BackgroundMode.enable();
      this.thaliProvider
        .init()
        .then((thali) => thali.setTeam())
        .then((thali) => thali.loadComponents())        
        .then(() => {
          this.rootPage = ReportsPage
        })
        .catch(console.log.bind(console));
    });
  }
}
