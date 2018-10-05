
import { FirstRunPage } from './../pages/index';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Authentication } from '../service/authentication';
import { App } from 'ionic-angular';

import { Settings } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
   
    {title: 'Mi Perfil', component: 'PerfilPage'},
    { title: 'Mis Proyectos', component: 'ProyectosPage'},
    { title: 'Mis Actividades Cercanas', component: 'ActividadesPage'},
   /* { title: 'Tabs', component: 'TabsPage' },*/
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
   /* { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },*/
    { title: 'Master Detail', component: 'ListMasterPage' },
    /*{ title: 'Menu', component: 'MenuPage' },*/
    /*CardsPageModule{ title: 'Settings', component: 'SettingsPage' },*/
    { title: 'Search', component: 'SearchPage' },
    {title: 'jh', component: 'InicioPage'}
   
  ]

  constructor(private translate: TranslateService, 
    platform: Platform, settings: Settings, 
    private config: Config, private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
     public auth: Authentication,public appCtrl: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    localStorage.setItem("apiUrl","http://localhost:3000/api/v1/")

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut(){
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("user_type");
      localStorage.removeItem("university");  
      localStorage.removeItem("status");  
      this.auth.logOut(); 
     
      this.nav.setRoot('WelcomePage');
  }
    
   
  isThereASession():boolean{
        return localStorage.getItem("jwt")!= null;
    }
   
    
  }

