import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ThaliProvider {

  private teamAlert: any;
  private loader: any;
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

        if (!settings[1]) {
          this.mode = settings[1] || 'wifi';
          this.settings.set('mode', this.mode)
        }
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
    }).present()
    console.info('LOADING JXCORE');

    this.loadJXCore()
    .then(() => this.initThali())
    .then()


  }

  private loadJXCore() {
    return new Promise((resolve, reject) => {
      // (<any>window).jxcore.isReady(() => {
      this.isJXcoreLoaded = true
      this.settings.set('isJXcoreLoaded', this.isJXcoreLoaded)
      //   console.info('JXCORE IS READY');
      //   if ((<any>window).window.ThaliPermissions) {
      //     (<any>window).window.ThaliPermissions.requestLocationPermission(() => {
      // return resolve(this);
      //   }, (error) => {
      //     // console.error(`Location permission not granted. Error: ${error}`)
      //     return reject(error);
      //   })
      // } else {
        return resolve()
      // }
      // })
    })
  }

  private initThali() {

  }

  public load() {
    // (<any>window).jxcore('app.js').loadMainFile((ret, err) => {
    //   console.log('JXCORE IS LOADED')
    //   this.storage.set('jxcoreLoaded', true)
    //   this.loader.dismiss()
    //   Promise
    //     .all([this.storage.get('deviceId'), this.storage.get('mode')])
    //     .then((settings)=>{
    //       console.log(settings)
    //       // if(settings['deviceId']){
    //       //   this.init(settings['deviceId'], settings['mode'])
    //       // }
    //     })
    // })
  }


  public switch(state: boolean) {
    // if (state === true) {
    //   (<any>window).jxcore('startThali').call(() =>{
    //     console.log('THALI STARTED');
    //   });
    // } else {
    //   (<any>window).jxcore('stopThali').call(() =>{
    //     console.log('THALI STOPED');
    //   });
    // }

  }

}
