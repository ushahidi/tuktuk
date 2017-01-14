import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  deviceId: any;
  mode: string;
  isThaliPeerRunning = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private settings: Storage
  ) {}

  ionViewDidLoad() {
    Promise
      .all([
        this.settings.get('deviceId'),
        this.settings.get('mode'),
        this.settings.get('isThaliPeerRunning')
      ])
      .then((settings) => {
        this.deviceId = parseInt(settings[0])
        this.mode = settings[1]
        this.isThaliPeerRunning = settings[2]
      })
  }



  private setDeviceId() {
    console.log('DEVICE ID', this.deviceId)
    this.settings.set('deviceId', parseInt(this.deviceId))
    // this.storage
    //   .get('jxcoreLoaded')
    //   .then((jxcoreLoaded) => {
    //     if (jxcoreLoaded && this.deviceId !== null ) {
    //       // this.thaliService.init(this.deviceId, this.mode)
    //     }
    //   })
  }

  private setMode() {
    console.log('MODE', this.mode)
    this.settings.set('mode', this.mode)
  }

  private setPeerState() {
    console.log('PEER STATE', this.isThaliPeerRunning)
    this.settings.set('isThaliPeerRunning', this.isThaliPeerRunning)
    // if(this.thaliRunning) {
    //   (<any>window).jxcore('startThali').call(() =>{
    //     console.log('THALI STARTED');
    //   })
    // }
    // if(!this.thaliRunning) {
    //   (<any>window).jxcore('stopThali').call(() =>{
    //     console.log('THALI STOPED');
    //   })
    // }
  }


}
