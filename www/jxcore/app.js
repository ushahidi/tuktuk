'use strict';
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var app = require('express')();
var ExpressPouchDB = require('express-pouchdb');
var PouchDB = require('pouchdb');
//
// // Thali
var PouchDBGenerator = require('thali/NextGeneration/utils/pouchDBGenerator');
var ThaliPeerPoolOneAtATime = require('thali/NextGeneration/thaliPeerPool/thaliPeerPoolOneAtATime');
var ThaliReplicationManager = require('thali/NextGeneration/thaliManager');
var ThaliMobile = require('thali/NextGeneration/thaliMobile');
var LeveldownMobile = require('leveldown-mobile');
var localStore;
var manager;
var keysToUse;

// var ThaliStore = new pouchDB('tuktuk')
console.log('THALI AND INIT LOADED ................')

// Keys
var ecdh1 = crypto.createECDH('secp256k1');
ecdh1.generateKeys();
ecdh1.setPublicKey('BNTJE6l6zcgm9yLjRyXn8Z1f2jA5m/60gYIDaJxiLDYJMUmV/5LJMHBSA9RVmjp9tyWQWkn0BWk6cvQiWpt86IE=', 'base64');
ecdh1.setPrivateKey('24lf26NsRnaxvruH3ui73q5vDGYb0phrJVdgUngOFp8=', 'base64');

var ecdh2 = crypto.createECDH('secp256k1');
ecdh2.generateKeys();
ecdh2.setPublicKey('BHaqGoN4VGmYUmK2kJ0UME36mBSKfcp9uXYvnxBLvwCLie05ieFCGJI2wGNkCplMDa7Wm18Y4b69rL7fkKFCFM8=', 'base64');
ecdh2.setPrivateKey('xRqiCIH1ka1omulZOzQxYJsX1IQOZRALu0+3miOuf2I=', 'base64');


Mobile('initThali').registerSync(function (deviceId, mode) {

    var ecdh;
    var dbPrefix;
    var thaliMode = ThaliMobile.networkTypes.BOTH;


    if (mode === 'native') {
        thaliMode = ThaliMobile.networkTypes.NATIVE;
    }

    if (mode === 'wifi') {
        thaliMode = ThaliMobile.networkTypes.WIFI;
    }

    if (deviceId === 1) {
        console.log('thali Using device 1 keys');
        ecdh = ecdh1;
        keysToUse = [ecdh2.getPublicKey()];
    } else {
        console.log('thali Using device 2 keys');
        ecdh = ecdh2;
        keysToUse = [ecdh1.getPublicKey()];
    }

    Mobile.getDocumentsPath(function(err, location) {
        if (err) {
            console.log('Tuktuk Error getting path');
            return;
        }
        else {
            dbPrefix = path.join(location, 'database');
            console.info('DB PREFIX ---------------')
            console.info(dbPrefix)

            if (!fs.existsSync(dbPrefix)) {
                fs.mkdirSync(dbPrefix);
            }

            console.log('Tuktuk initialize thali');
            PouchDB = PouchDBGenerator(PouchDB, dbPrefix + '/', {
                defaultAdapter: LeveldownMobile
            });

            manager = new ThaliReplicationManager(
                ExpressPouchDB,
                PouchDB,
                'tuktuk',
                ecdh,
                //new ThaliPeerPoolDefault(),
                new ThaliPeerPoolOneAtATime(),
                thaliMode);

          app.use(dbPrefix, ExpressPouchDB(PouchDB));
          app.listen(8424,() => {
            console.log('tuktuk server started on port 8424')
          });

          localStore = new PouchDB('tuktuk');
          // return localStore;

        }
    });
});

Mobile('startThali').registerSync(function () {
    console.log('TestApp start thali');
    manager.start(keysToUse);
});

Mobile('stopThali').registerSync(function () {
    console.log('TestApp stop thali');
    manager.stop();
});
