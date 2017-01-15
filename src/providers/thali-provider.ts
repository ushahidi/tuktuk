import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ThaliProvider {

  private teamAlert: any;
  public loader: any;
  public deviceId: any;
  public mode: string;
  public isThaliPeerRunning = false;
  public isThaliInitialized = false;
  public isJXcoreLoaded = false;


  constructor(
    private settings: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.settings.set('isJXcoreLoaded', this.isJXcoreLoaded)
    this.settings.set('isThaliInitialized', this.isThaliInitialized)
    this.settings.set('isThaliPeerRunning', this.isThaliPeerRunning)
  }

  public init() {
    return Promise
      .all([
        this.settings.get('deviceId'),
        this.settings.get('mode')
      ])
      .then((settings) => {
        this.deviceId = settings[0];
        this.mode = settings[1] || 'both';
        this.settings.set('mode', this.mode)
        return this;
      })
  }

  public setTeam() {
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
            this.settings.set('deviceId', deviceId)
            resolve(this);
          }
        });
        this.teamAlert.present();
      } else {
        resolve(this);
      }
    })

  }

  public loadComponents() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Components. Please wait...",
    })

    this.loader.present()
    console.info('LOADING JXCORE');

    return new Promise((resolve, reject) => {
      this
        .getPermissions()
        .then(() => this.loadJXcore())
        .then(() => this.initThali())
        .then(() => {
          return resolve(this)
        })
    })
  }

  private getPermissions() {
    return new Promise((resolve, reject) => {
      if (typeof (<any>window).jxcore == 'function') {
        (<any>window).jxcore.isReady(() => {
          console.info('JXCORE IS READY');
          if ((<any>window).window.ThaliPermissions) {
            (<any>window).window.ThaliPermissions.requestLocationPermission(() => {
              return resolve(this);
            }, (error) => {
              // console.error(`Location permission not granted. Error: ${error}`)
              return reject(error);
            })
          } else {
            return resolve()
          }
        })
      } else {
        return resolve()
      }
    })
  }

  private loadJXcore() {
    return new Promise((resolve, reject) => {
      if (this.isJXcoreLoaded) {
        return resolve()
      }

      if (typeof (<any>window).jxcore == 'function') {
        (<any>window).jxcore('app.js').loadMainFile((ret, err) => {
          console.info('JXCORE IS LOADED')
              
          this.isJXcoreLoaded = true
          this.settings.set('isJXcoreLoaded', this.isJXcoreLoaded)
          if (err) {
            return reject(err);
          }
          return resolve()
        })
      } else {
        this.isJXcoreLoaded = true
        this.settings.set('isJXcoreLoaded', this.isJXcoreLoaded)
        return resolve()
      }

    })
  }

  private initThali() {
    return new Promise((resolve, reject) => {
      if (typeof (<any>window).jxcore == 'function') {
        (<any>window).jxcore('initThali').call(this.deviceId, this.mode, () => {
          console.info(`THALI INITIALIZED FOR DEVICE ID ${this.deviceId}`)
          this.isThaliInitialized = true
          this.settings.set('isThaliInitialized', this.isThaliInitialized)
          return resolve()
        });
      } else {
        this.isThaliInitialized = true
        this.settings.set('isThaliInitialized', this.isThaliInitialized)
        return resolve()
      }
    })
  }

  public switchPeer() {
    return new Promise((resolve, reject) => {
      this.settings.get('isThaliPeerRunning')
        .then((isThaliPeerRunning) => {
          console.log('IS PEER RUNNING?',isThaliPeerRunning)
          return resolve()
          // if (isThaliPeerRunning) {
          //   (<any>window).jxcore('startThali').call(() => {
          //     console.log('THALI STARTED');
          //     return resolve()
          //   });
          // } else {
          //   (<any>window).jxcore('stopThali').call(() => {
          //     console.log('THALI STOPPED');
          //     return resolve()
          //   });
          // }
        })
    })

  }

}
