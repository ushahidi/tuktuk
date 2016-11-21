import { Component } from '@angular/core';

import { ReportsPage } from '../reports';
import { LocationsPage } from '../locations';
import { ContactsPage } from '../contacts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = ReportsPage;
  tab2Root: any = LocationsPage;
  tab3Root: any = ContactsPage;

  constructor() {
  }
}
