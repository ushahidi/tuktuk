import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ReportsPage } from '../pages/reports';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Tuktuk {
  rootPage = ReportsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      // const dbStorage = new SQLite();
      // dbStorage
      // .openDatabase({ name: "data.db", location: "default" })
      // .then(() => {
      //   dbStorage
      //   .executeSql("CREATE TABLE IF NOT EXISTS reports (id BLOB PRIMARY KEY, description TEXT, address TEXT)", [])
      //   .catch((error) => {
      //     console.error('Unable to execute sql: ', error);
      //   })
      // })
      // .catch((error) => {
      //   console.error('Unable to open database: ', error);
      // })

    });
  }
}
