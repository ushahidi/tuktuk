import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DataService } from '../../providers'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsForm: FormGroup
  isThaliPeerRunning: any

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private configs: Storage,
    private data: DataService
  ) {}

  ionViewWillEnter() {
    console.log('SETTINGS', this)
    this.configs.get('isThaliPeerRunning')
    .then((isThaliPeerRunning)=>{
      this.isThaliPeerRunning = isThaliPeerRunning;
      this.settingsForm = this.formBuilder.group({
        isThaliPeerRunning: isThaliPeerRunning
      })
    })
  }

  // save() {
  //   console.log('SETTINGS', this.settingsForm.value)
  //   this.configs.set('mode', this.settingsForm.value.mode)
  //   // this.thaliProvider.init()
  //   //   .then((thali) => thali.loadComponents())
  //   //   .then((thali) => this.reportProvider.init())
  //   this.navCtrl.pop()
  // }

  setPeerState() {
    this.configs.set('isThaliPeerRunning', this.isThaliPeerRunning)
    this.data.switchPeer()
  }
}
