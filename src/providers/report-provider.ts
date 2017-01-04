import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import uuid from 'uuid/v4';

/*
Generated class for the ReportProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReportProvider {

  constructor() {

    // const db = new SQLite();
    // db.openDatabase({ name: "data.db", location: "default" })
    // .then(() => {
    //   db.executeSql("CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, address TEXT)", [])
    //   .catch((error) => {
    //     console.error('Unable to execute sql: ', error);
    //   })
    // })
    // .then(() => {
    //   console.info('DB OPENED SUCCESSFULLY')
    // })
    // .catch((error) => {
    //   console.error('Unable to open database: ', error);
    // })
    // this.storage = db;

  }

  public fetch() {
    // return new Promise((resolve, reject) => {
    //   this.storage.executeSql("SELECT * FROM reports", []).then((data) => {
    //     let reports = [];
    //     if (data.rows.length > 0) {
    //       for (let i = 0; i < data.rows.length; i++) {
    //         reports.push({
    //           id: data.rows.item(i).id,
    //           firstname: data.rows.item(i).description,
    //           lastname: data.rows.item(i).address
    //         });
    //       }
    //     }
    //     console.log(`REPORTS ${reports}`)
    //     resolve(reports);
    //   }, (error) => {
    //     reject(error);
    //   });
    // });
  }

  public add(description: string, address: string) {
    const id = uuid();
    console.info(`SAVING ID: ${id}`)
    // return new Promise((resolve, reject) => {
    //   this.storage
    //   .executeSql("INSERT INTO reports (description, address) VALUES (?, ?)", [ description, address])
    //   .then((data) => {
    //     console.log(`INSERTED DATA: ${JSON.stringify(data)}`)
    //     resolve(data);
    //   }, (error) => {
    //     reject(error);
    //   });
    // });
  }

}
