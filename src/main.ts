import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyA1Gp4AOJDye5iZ3oZJ8_6t2NyFilIcIRM',
  authDomain: 'professorappbe.firebaseapp.com',
  projectId: 'professorappbe',
  storageBucket: 'professorappbe.appspot.com',
  messagingSenderId: '234120862120',
  appId: '1:234120862120:web:8d65ea1189446b5b26e59d',
  measurementId: 'G-DZ7XRPT9DH'
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

