import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { ReportsPage } from '../pages/reports';
import { CreateReportPage } from '../pages/reports';
import { ReportProvider } from '../providers/report-provider';

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
  providers: [ ReportProvider ]
})

export class AppModule {}
