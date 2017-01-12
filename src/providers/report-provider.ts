import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';

@Injectable()
export class ReportProvider {

  private data: any;
  private store: any;
  // private remote: any;

  constructor() {
    this.initLocalDb();
    // this.initJXCoreStore();
  }

  private initLocalDb() {
    this.store = new PouchDB('tuktuk');
  }

  private initJXCoreStore() {
    (<any>window).jxcore.isReady(() => {
      console.info('JXCORE IS READY');
      if ((<any>window).window.ThaliPermissions) {
        (<any>window).window.ThaliPermissions.requestLocationPermission(() => {

          (<any>window).jxcore('app.js').loadMainFile(function(ret, err) {
            console.log('jxcore loaded')
            this.init();
          })
        }, function(error) {
          console.error(`Location permission not granted. Error: ${error}`)
        })

      } else {
        (<any>window).jxcore('app.js').loadMainFile(function(ret, err) {
          console.log('jxcore loaded')
          this.init();
        })
      }
    })
  }

  public fetch() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.store.allDocs({
        include_docs: true
      }).then((result) => {

        this.data = [];

        result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.store.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.error(error);
      });

    });
  }

  public add(report) {
    this.store.post(report);
  }

  public delete(report) {
    this.store.remove(report).catch((err) => {
      console.error(err);
    });
  }

  public update(report) {
    this.store.put(report).catch((err) => {
      console.error(err);
    });
  }

  public handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });


    if (change.deleted) {
      // A document was deleted
      this.data.splice(changedIndex, 1);
    } else {

      if (changedDoc) {
        // A document was updated
        this.data[changedIndex] = change.doc;
      } else {
        // A document was added
        this.data.push(change.doc);
      }

    }
  }

}
