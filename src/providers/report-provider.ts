import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

@Injectable()
export class ReportProvider {

  data: any;
  db: any;
  remote: any;
  constructor() {
    this.initLocalDb();
    // this.initJXCoreStore();
  }

  private initLocalDb() {
    this.db = new PouchDB('tuktuk');
    this.remote = 'http://localhost:5984/tuktuk';
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
    this.db.sync(this.remote, options);
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
      this.db.allDocs({
        include_docs: true
      }).then((result) => {

        this.data = [];

        let doc = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.error(error);
      });

    });
  }

  public add(report) {
    this.db.post(report);
  }

  public delete(report) {
    this.db.remove(report).catch((err) => {
      console.error(err);
    });
  }

  public update(report) {
    this.db.put(report).catch((err) => {
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
