import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  deviceId: any;
  mode: string;
  thali: boolean;
  jxcoreLoaded: boolean;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.storage.set('jxcoreLoaded', false)
    this.storage.set('mode', 'both')
    this.storage.set('thali', false)
  }

  ionViewDidLoad() {
    this.storage
      .get('jxcoreLoaded')
      .then((jxcoreLoaded) => {
        this.jxcoreLoaded = jxcoreLoaded;
        if (!jxcoreLoaded) {
          this.showLoading()
        }
      })

    this.storage
      .get('deviceId')
      .then((deviceId) => {
        this.deviceId = deviceId;
      })

    this.storage
      .get('mode')
      .then((mode) => {
        this.mode = mode;
      })

    this.storage
      .get('thali')
      .then((thali) => {
        this.thali = thali;
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
      title: 'Pick Device Id!',
      subTitle: 'In order for Thali to work you need to pick your device Id!',
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading Thali. Please wait...",
      duration: 3000
    });
    loader.present();
  }

  setDeviceId() {
    this.storage
      .set('deviceId', parseInt(this.deviceId))
  }

  setMode() {
    this.storage.set('mode', this.mode)
  }

  setState() {
    this.storage.set('thali', this.thali)
  }


}
