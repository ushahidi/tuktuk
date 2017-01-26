import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ReportProvider, ThaliProvider } from '../../providers'

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
    private settings: Storage,
    private thaliProvider: ThaliProvider,
    private reportProvider: ReportProvider
  ) {}

  ionViewDidLoad() {
    console.log('SETTINGS', this)
    this.settingsForm = this.formBuilder.group({
      mode: this.thaliProvider.mode
    })
    this.isThaliPeerRunning = this.thaliProvider.isThaliPeerRunning;
  }

  save() {
    console.log('SETTINGS', this.settingsForm.value)
    this.settings.set('mode', this.settingsForm.value.mode)
    // this.thaliProvider.init()
    //   .then((thali) => thali.loadComponents())
    //   .then((thali) => this.reportProvider.init())
    this.navCtrl.pop()
  }

  setPeerState() {
    this.settings.set('isThaliPeerRunning', this.isThaliPeerRunning)
    // this.thaliProvider.switchPeer()
  }
}
