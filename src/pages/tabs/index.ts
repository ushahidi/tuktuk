import { Component } from '@angular/core';

import { Timeline } from '../timeline';
import { Map } from '../map';

@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root: any = Timeline;
  tab2Root: any = Map;  

  constructor() {
  }
}
