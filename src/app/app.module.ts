import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { TabsPage } from '../pages/tabs';
import { LocationsPage } from '../pages/locations';
import { ReportsPage } from '../pages/reports';
import { ContactsPage } from '../pages/contacts';

@NgModule({
  declarations: [Tuktuk, TabsPage, ReportsPage, LocationsPage, ContactsPage  ],
  imports: [ IonicModule.forRoot(Tuktuk)],
  bootstrap: [IonicApp],
  entryComponents: [Tuktuk, TabsPage, ReportsPage, LocationsPage, ContactsPage ],
  providers: []
})

export class AppModule {}
