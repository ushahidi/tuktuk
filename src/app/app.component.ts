import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ReportsPage } from '../pages/reports';
import { SettingsPage } from '../pages/settings';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Tuktuk {
  rootPage: any;

  constructor(
    platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.show();
      this.rootPage = ReportsPage;
    });
  }
}
