import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Tuktuk } from './app.component';
import { Map } from '../pages/map';
import { Timeline } from '../pages/timeline';
import { Tabs } from '../pages/tabs';
import { Add } from '../pages/add';

@NgModule({
  declarations: [
    Tuktuk,
    Map,
    Timeline,
    Tabs,
    Add
  ],
  imports: [
    IonicModule.forRoot(Tuktuk)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Tuktuk,
    Map,
    Timeline,
    Tabs,
    Add
  ],
  providers: []
})
export class AppModule {}
