import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { TabsPage } from '../pages/tabs';
import { LocationsPage } from '../pages/locations';
import { ReportsPage } from '../pages/reports';
import { CreateReportPage } from '../pages/reports';
import { ContactsPage } from '../pages/contacts';

@NgModule({
  declarations: [Tuktuk, TabsPage, ReportsPage, CreateReportPage, LocationsPage, ContactsPage  ],
  imports: [ IonicModule.forRoot(Tuktuk)],
  bootstrap: [IonicApp],
  entryComponents: [Tuktuk, TabsPage, ReportsPage, CreateReportPage, LocationsPage, ContactsPage ],
  providers: []
})

export class AppModule {}
