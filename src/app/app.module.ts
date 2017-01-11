import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { ReportsPage, CreateReportPage } from '../pages/reports';
import { SettingsPage } from '../pages/settings';
import { ReportProvider } from '../providers/report-provider';

@NgModule({
  declarations: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  imports: [ IonicModule.forRoot(Tuktuk,{
    backButtonText: '',
    backButtonIcon: 'close'
  })],
  bootstrap: [IonicApp],
  entryComponents: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  providers: [ ReportProvider ]
})

export class AppModule {}
