import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {
  mode = 'both';
  thali = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  setMode() {
    console.log(this.mode);
    // set the thali mode here
  }

  setState() {
    console.log(this.thali);
    // set the thali start/stop
  }


}
