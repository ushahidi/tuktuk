import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { ReportsPage, CreateReportPage } from '../pages/reports';
import { SettingsPage } from '../pages/settings';
import { ReportProvider, ThaliProvider } from '../providers';
import { Storage } from '@ionic/storage';
import { ElasticModule } from 'angular2-elastic';

export function provideStorage() {
  return new Storage(['websql', 'indexeddb'], { name: '_settings_tuktuk', storeName: '_thali' });
}

@NgModule({
  declarations: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  imports: [IonicModule.forRoot(Tuktuk, {
    backButtonText: '',
    backButtonIcon: 'close'
  }),ElasticModule],
  bootstrap: [IonicApp],
  entryComponents: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  providers: [{ provide: Storage, useFactory: provideStorage }, ReportProvider, ThaliProvider]
})

export class AppModule { }
