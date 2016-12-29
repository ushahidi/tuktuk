import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportsPage } from '../reports';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportProvider } from '../../providers/report-provider';
import { Camera } from 'ionic-native';


@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html',
})

export class CreateReportPage {
  reportForm: FormGroup
  photo: string;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public store: ReportProvider
  ) {
    this.reportForm = this.formBuilder.group({
      description: [],
      address: [],
      time: [],
      date: []
    })
  }

  save() {
    this.store
    .set(this.reportForm.value.description,this.reportForm.value.address)
    .then((result)=>{
      console.info('RESULT ON SAVE',JSON.stringify(result))
      this.navCtrl.push(ReportsPage)
    })
    .catch((error)=> {
      console.error(error)
    })

  }

  takePicture() {
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      this.photo= `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
        console.log(err);
    });
  }

}
