import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Add } from '../add';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class Timeline {

  add = Add;

  constructor(public navCtrl: NavController) {

  }

}
