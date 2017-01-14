import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ReportProvider {

    private data: any;
    private store: any;
    private remote: any;

    constructor(
        private settings: Storage,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController        
    ) {}



    // setMode() {
    //     this.settings.set('mode', this.mode)
    // }

    // setPeerState() {
    //     this.settings.set('isThaliPeerRunning', this.isThaliPeerRunning)
    //     // if(this.isThaliRunning) {
    //     //   (<any>window).jxcore('startThali').call(() =>{
    //     //     console.log('THALI STARTED');
    //     //   })
    //     // }
    //     // if(!this.isThaliRunning) {
    //     //   (<any>window).jxcore('stopThali').call(() =>{
    //     //     console.log('THALI STOPPED');
    //     //   })
    //     // }
    // }
    //
    setDeviceId() {
        // this.settings.set('deviceId', parseInt(this.deviceId))
        // if (this.isJXcoreLoaded && this.deviceId !== null) {
        //     // this.thaliService.init(this.deviceId, this.mode)
        // }
    }

    // constructor() {
    //   this.store = new PouchDB('http://127.0.0.1:8424/database/tuktuk');
    //   this.remote = 'http://127.0.0.1:5984/tuktuk';
    //   let options = {
    //     since: 'now',
    //     live: true,
    //     timeout: false,
    //     include_docs: true,
    //     attachments: true,
    //     binary: true,
    //     batch_size: 40
    //   };
    //   this.store.sync(this.remote, options);
    //   console.log('REMOTE SYNC INITIALIZED')
    // }
    // public init() {
    //
    // }

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
