import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class ReportProvider {

  private reports: any;
  private store: any;
  private remote: any;

  constructor(
    private settings: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  public init() {
    return this.settings
    .get('isThaliInitialized')
    .then((isThaliInitialized) => {
      return new Promise((resolve, reject) => {
        if (isThaliInitialized) {          
          this.store = new PouchDB('tuktuk')
          this.store.info()
          .then((info) => {
            console.log('CONNECTED TO THALI STORE .. go fish')
            console.log(info);
            return resolve(this);
          })
          .catch(reject)
        }
      })
    })
  }

  public syncThaliLocal() {
    // this.remote = new PouchDB('http://127.0.0.1:8424/tuktuk', { ajax: { cache:false, withCredentials: false}});
    this.remote = 'http://127.0.0.1:8424/tuktuk';
    let options = {
      since: 'now',
      live: true,
      timeout: false,
      include_docs: true,
      attachments: true,
      binary: true,
      batch_size: 40
    };
    this.store.sync(this.remote, options)
    .on('change',  (info) => {
      console.log('SYNC HAPPENED ..', info)
    })
    .on('paused', (err) => {
      console.log('PAUSED SYNC', err)
    })
    .on('active', ()=> {
      console.log('REMOTE SYNC ACTIVE')
    })
    .on('denied',  (err) => {
      console.error('DENIED SYNC', err)
    })
    .on('complete',(info)=>{
      console.info('REMOTE SYNC COMPLETE')
    })
    .on('error', (err) => {
      console.error(err)
    });
    console.log('REMOTE SYNC INITIALIZED')
  }

  public fetch() {
    if (this.reports) {
      return Promise.resolve(this.reports);
    }

    return new Promise(resolve => {
      this.store.allDocs({
        include_docs: true,
        attachments: true
      })
      .then((result) => {
        this.reports = [];
        result.rows.map((row) => {
          if (row.doc._attachments) {
            row.doc.photo = `data:image/jpeg;base64,${row.doc._attachments['att.txt'].data}`;
          }
          row.doc.team = (row.doc.deviceId == 1)?'Team One': 'Team Two'
          this.reports.push(row.doc);
        });

        this
        .store
        .changes({
          live: true,
          since: 'now',
          include_docs: true,
          attachments: true
        })
        .on('change', (change) => {
          this.handleChange(change);
        });

        resolve(this.reports);

      }).catch((error) => {
        console.error(error);
      });

    });
  }

  public add(report) {
    return this.store.post(report);
  }

  public delete(report) {
    return this.store.remove(report).catch((err) => {
      console.error(err);
    });
  }

  public update(report) {
    return this.store.put(report).catch((err) => {
      console.error(err);
    });
  }

  public handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.reports.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });


    if (change.deleted) {
      // A document was deleted
      this.reports.splice(changedIndex, 1);
    } else {

      if (changedDoc) {
        // A document was updated
        this.reports[changedIndex] = change.doc;
      } else {
        // A document was added
        this.reports.push(change.doc);
      }

    }
  }

}
