import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { ReportsPage, CreateReportPage } from '../pages/reports';
import { SettingsPage } from '../pages/settings';
import { DataService} from '../providers';
import { Storage } from '@ionic/storage';
import { ElasticModule } from 'angular2-elastic';

export function configStorage() {
  return new Storage(['websql', 'indexeddb'], { name: '_settings_tuktuk', storeName: '_thali' });
}

@NgModule({
  declarations: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  imports: [IonicModule.forRoot(Tuktuk), ElasticModule],
  bootstrap: [IonicApp],
  entryComponents: [
    Tuktuk,
    ReportsPage,
    CreateReportPage,
    SettingsPage
  ],
  providers: [{
    provide: Storage,
    useFactory: configStorage
  },
  DataService
  ]
})

export class AppModule { }
