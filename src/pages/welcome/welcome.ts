import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { MainPage } from '../';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public menu:MenuController) { }
  
  ionViewDidLoad(){
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
   
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('RolPage');
  }
  ionViewWillEnter(){
    let user=localStorage.getItem("user");
    let jwt=localStorage.getItem("jwt");
    let token=localStorage.getItem("token");
    if(user && jwt && token  ){
        this.navCtrl.setRoot(MainPage);
    }
    console.log(localStorage.getItem('jwt'));

  }
}
