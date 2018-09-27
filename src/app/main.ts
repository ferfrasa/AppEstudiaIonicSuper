import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import * as firebase from 'firebase';
import { firebaseConfig } from './../environments/firebase-config';


//Inicializando Firebase
firebase.initializeApp(firebaseConfig); // traer las credenciales de firebase
firebase.auth().getRedirectResult().then(result => console.log(result));
platformBrowserDynamic().bootstrapModule(AppModule);

