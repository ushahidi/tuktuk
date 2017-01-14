import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ReportsPage } from '../pages/reports';
import { ReportProvider, ThaliProvider } from '../providers'

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Tuktuk {
    rootPage: any;

    constructor(
        public platform: Platform,
        private reportProvider: ReportProvider,
        private thaliProvider: ThaliProvider,
        private loading: LoadingController
    ) {
        platform.ready().then(() => {
            this.thaliProvider
                .init()
                .then((provider) => provider.setTeam())
                .then((provider)=> provider.loadComponents())


            // console.log(Device, ' -- device');
            // console.info(device)
            // Start Thali load here
            // StatusBar.styleDefault();
            // Splashscreen.hide();

        });
    }
}
