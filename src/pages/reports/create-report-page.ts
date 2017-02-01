import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../providers';
import { Camera } from 'ionic-native';
import { ReportsPage } from './reports-page';


@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html',
})

export class CreateReportPage {
  reportsPage = ReportsPage;
  reportForm: FormGroup
  photo: any;
  imageData: any;
  report: any;

  constructor(
    public nav: NavController,
    public events: Events,
    public formBuilder: FormBuilder,
    public dataService: DataService,
  ) {

    this.reportForm = this.formBuilder.group({
      description: [],
      address: [],
      time: [],
      date: []
    })
  }

  save() {
    this.report = {
      deviceId: this.dataService.deviceId,
      description: this.reportForm.value.description,
      address: this.reportForm.value.address,
      dateTime: new Date(`${this.reportForm.value.date} ${this.reportForm.value.time}`).toISOString(),
      timestamp: Date.now()
    }

    if (this.imageData) {
      this.report._attachments = {
        'att.txt': {
          content_type: "text/plain",
          data: this.imageData
        }
      }
    }

    this
      .dataService
      .add(this.report)
      .then(()=> this.nav.pop())
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 640,
      targetHeight: 640
    })
      .then((imageData) => {
        this.imageData = imageData;
        this.photo = `data:image/jpeg;base64,${imageData}`;
      })
      .catch((error) => console.error(error));
  }

}
