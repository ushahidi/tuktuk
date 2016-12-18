import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { ReportsPage } from '../pages/reports';
import { CreateReportPage } from '../pages/reports';

@NgModule({
  declarations: [
    Tuktuk,
    ReportsPage,
    CreateReportPage
  ],
  imports: [ IonicModule.forRoot(Tuktuk,{
    backButtonText: '',
    backButtonIcon: 'close'
  })],
  bootstrap: [IonicApp],
  entryComponents: [
    Tuktuk,
    ReportsPage,
    CreateReportPage
  ],
  providers: []
})

export class AppModule {}
