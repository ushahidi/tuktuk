import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Platform, AlertController, LoadingController, ToastController } from 'ionic-angular';


@Injectable()
export class DataService {

  public deviceId: any;
  public mode: string;
  public isThaliPeerRunning = false;
  public isThaliInitialized = false;
  public isJXcoreLoaded = false;
  private teamAlert: any;
  private loader: any;
  // private toaster: any;

  constructor (
    public platform: Platform,
    private config: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    config.set('isJXcoreLoaded', this.isJXcoreLoaded)
    config.set('isThaliInitialized', this.isThaliInitialized)
    config.set('isThaliPeerRunning', this.isThaliPeerRunning)

    // this.toaster = this.toastCtrl.create({
    //   message: "Thali peer to peer sync is on",
    //   position: 'bottom'
    // })
  }

  start() {
    return Promise
    .all([
      this.config.get('deviceId'),
      this.config.get('mode')
    ])
    .then((config) => {
      this.deviceId = config[0];
      this.mode = config[1] || 'both';
      this.config.set('mode', this.mode)
      return Promise.resolve(this); // this.setTeam();
    })
  }


  setTeam() {
    return new Promise((resolve, reject) => {
      if (!this.deviceId) {
        this.teamAlert = this.alertCtrl.create({
          title: 'Select your Team'
        });
        this.teamAlert.addInput({
          type: 'radio',
          label: 'Team One',
          value: 1
        });
        this.teamAlert.addInput({
          type: 'radio',
          label: 'Team Two',
          value: 2
        });
        this.teamAlert.addButton({
          text: 'OK',
          handler: deviceId => {
            this.deviceId = deviceId
            this.config.set('deviceId', deviceId)
            resolve(this);
          }
        });
        this.teamAlert.present();
      } else {
        resolve(this);
      }
    })
  }

  public connect() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Components. Please wait...",
    })

    this.loader.present()
    console.info('LOADING JXCORE');

    return this.getDevicePermissions()
    .then(() => this.loadJXcore())
    .then(() => this.initThali())
    .then(() => {
      return new Promise((resolve, reject) => {
        (<any>window).jxcore('info').call('get db info',(info, error) =>{
          if(error) {
            return reject(error)
          }
          console.log('CONNECTED TO THALI STORE .. go fish')
          console.log(info);
          this.loader.dismiss()
          return resolve(this)
        });
      })
    })
  }


  private getDevicePermissions() {
    return new Promise((resolve, reject) => {
      (<any>window).jxcore.isReady(() => {
        console.info('JXCORE IS READY');
        if ((<any>window).window.ThaliPermissions) {
          (<any>window).window.ThaliPermissions.requestLocationPermission(() => {
            return resolve(this);
          }, (error) => {
            return reject(error);
          })
        } else {
          return resolve(this)
        }
      })
    })
  }

  private loadJXcore() {
    return new Promise((resolve, reject) => {
      if (this.isJXcoreLoaded) {
        return resolve()
      }
      (<any>window).jxcore('app.js').loadMainFile((ret, err) => {
        console.info('JXCORE IS LOADED')
        this.isJXcoreLoaded = true
        this.config.set('isJXcoreLoaded', this.isJXcoreLoaded)
        if (err) {
          return reject(err);
        }
        return resolve(this)
      })


    })
  }

  private initThali() {
    return new Promise((resolve, reject) => {
      if (!this.isThaliInitialized) {
        (<any>window).jxcore('initThali').call(this.deviceId, this.mode, () => {
          console.info(`THALI INITIALIZED FOR DEVICE ID ${this.deviceId}`)

          this.isThaliInitialized = true
          this.config.set('isThaliInitialized', this.isThaliInitialized)
          return resolve(this)
        });
      }
      return resolve(this)
    })
  }


  public fetch() {
    return new Promise((resolve, reject) => {
      (<any>window).jxcore('fetch').call('getting all docs', (results, error) => {
        if(error){
          return reject(error);
        }
        let reports = [];
        results.rows.map((row) => {
          if (row.doc._attachments) {
            row.doc.photo = `data:image/jpeg;base64,${row.doc._attachments['att.txt'].data}`;
          }
          row.doc.team = (row.doc.deviceId == 1)?'Team One': 'Team Two'
          reports.push(row.doc);
        });
        reports.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        return resolve(reports);
      })
    })

  }

  public add(report) {
    return new Promise((resolve, reject) => {
      (<any>window).jxcore('add').call(report, (res) => {
        console.log('ADD RESPONSE',res)
        return resolve(res);
      });
    })
  }

  public switchPeer(){
    this.config
    .get('isThaliPeerRunning')
    .then((isThaliPeerRunning) => {
      if(isThaliPeerRunning) {
        (<any>window).jxcore('startThali').call(() => {
          console.log('THALI PEER HAS STARTED RUNNING')
          // this.toaster.present();
        });
      } else {
        (<any>window).jxcore('stopThali').call(() => {
          console.log('THALI PEER HAS STOPPED RUNNING')
          // this.toaster.dismiss()
        });
      }
    })
  }

}
