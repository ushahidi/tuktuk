import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Thali } from '../../providers';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  deviceId: any;
  mode: string;
  thaliRunning: boolean;
  jxcoreLoaded: boolean;
  thaliInitialized: boolean;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private storage: Storage,
    // public thaliService: Thali
  ) { }

  ionViewDidLoad() {
    this.storage
      .get('deviceId')
      .then((deviceId) => {
        this.deviceId = deviceId;
      })

    this.storage
      .get('mode')
      .then((mode) => {
        this.mode = (mode)? mode :'both';
      })

    this.storage
      .get('thaliRunning')
      .then((thaliRunning) => {
        this.thaliRunning = (thaliRunning)?true:false;
      })

  }

  ionViewCanLeave(): boolean {
    if (this.deviceId !== null) {
      console.info('FIRE UP INIT THALI')
      return true;
    } else {
      this.showAlert()
      return false;
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Select Device!',
      subTitle: 'In order for Thali to work you need to select a device!',
      buttons: ['OK']
    });
    alert.present();
  }

  setDeviceId() {
    this.storage.set('deviceId', parseInt(this.deviceId))
    this.storage
      .get('jxcoreLoaded')
      .then((jxcoreLoaded) => {
        if (jxcoreLoaded && this.deviceId !== null ) {
          // this.thaliService.init(this.deviceId, this.mode)
        }
      })
  }

  setMode() {
    this.storage.set('mode', this.mode)
  }

  setState() {
    this.storage.set('thaliRunning', this.thaliRunning)
    if(this.thaliRunning) {
      (<any>window).jxcore('startThali').call(() =>{
        console.log('THALI STARTED');
      })
    }
    if(!this.thaliRunning) {
      (<any>window).jxcore('stopThali').call(() =>{
        console.log('THALI STOPED');
      })
    }
  }


}
