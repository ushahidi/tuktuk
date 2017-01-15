import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportProvider, ThaliProvider } from '../../providers';
import { Camera } from 'ionic-native';


@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html',
})

export class CreateReportPage {
  reportForm: FormGroup
  photo: any;
  report: any;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public reportProvider: ReportProvider,
    public thaliProvider: ThaliProvider
  ) {
    let now = new Date().toISOString()    
    this.reportForm = this.formBuilder.group({
      description: [],
      address: [],
      time: now,
      date: now
    })
  }

  save() {
    this.report = {
      deviceId: this.thaliProvider.deviceId,
      photo:this.photo || '',
      description: this.reportForm.value.description,
      address: this.reportForm.value.address,
      time: this.reportForm.value.time,
      date: this.reportForm.value.date
    }
    console.log('REPORT', this.report)

    // this.reportProvider.add(this.reportForm.value)
    // this.navCtrl.pop()
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 360,
      targetHeight: 360
    })
    .then((imageData) => {
      console.dir(imageData)
      this.photo = `data:image/jpeg;base64,${imageData}`;
      console.log('PHOTO', this.photo);
    })
    .catch((error)=>{
      console.error(error)
    });
  }

}
