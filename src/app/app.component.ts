import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ReportsPage } from '../pages/reports';
import { DataService } from '../providers'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Tuktuk {
  rootPage: any;

  constructor(
    public dataService: DataService,
    public platform: Platform
  ) {
    this.dataService.start()
    .then((ds)=>ds.setTeam())
    .then((ds)=>ds.connect())
    .then(() =>this.platformReady());
  }

  platformReady() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.rootPage = ReportsPage
    });
  }
}
