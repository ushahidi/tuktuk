import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html'
})

export class CreateReportPage {
  report:FormGroup;
  pic: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.report = this.formBuilder.group({
      description: [''],
      address: [''],
      time: [''],
      date: ['']
    });
  }


  logForm() {
    console.log(JSON.stringify(this.report.value))
  }

  takePicture() {
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.pic = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
        console.log(err);
    });
  }

}
