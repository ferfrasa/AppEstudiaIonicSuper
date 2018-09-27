import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,AlertController, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { Authentication } from '../../service/authentication';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: "",
    password: ""
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private auth: Authentication,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    this.auth.login(this.account.email,this.account.password).then(result =>{
     // this.navCtrl.push('CardsPage');

     loading.dismiss();
      /*this.navCtrl.push('CardsPage')pagina de cards;
      /*this.navCtrl.push('ContentPage')- pagina vacia;*/
     // this.navCtrl.push('ItemCreatePage'); # formulario de crear
      /*this.navCtrl.push('ItemDetailPage'); detaales tems*/
      /*this.navCtrl.push('ListMasterPage'); #lista de items*/
      this.navCtrl.push(MainPage);/* #pagina del content*/
      /*this.navCtrl.push('SearchPage')- ;*/
      /*this.navCtrl.push('SettingsPage'); pagina de settings*/
      /*this.navCtrl.push('TabsPage')# pagina con tabs;*/
      /*this.navCtrl.push('TutorialPage'); #indexsliderer*/
      /*this.navCtrl.push('WelcomePage'); # logjn and register*/

    }).catch(error=>{
      loading.dismiss();
        console.log(error);
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    })

   /* this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }
  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}
}
