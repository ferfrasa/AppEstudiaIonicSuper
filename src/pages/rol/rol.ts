import { SignupPage } from './../signup/signup';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rol',
  templateUrl: 'rol.html',
})
export class RolPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, icon: string, id: number}>;
  itemRol: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController) {

    this.selectedItem = navParams.get('item');
    this.icons = ['briefcase',  'contacts','happy', 'football'];
    this.items = [];
  
  }
  


  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Espera por favor...'
    });
    loading.present();


    console.log('ionViewDidLoad RolPage');
    this.authServiceProvider.getData('user_types').subscribe(
      (data) => {
        loading.dismiss();
        console.log("listas " + data);
        let j=0;
        for (let i in data) {
          
          if((JSON.stringify(data[i]['name'])!=='"admin"')&&
          (JSON.stringify(data[i]['name'])!=='"user"')){ 
          console.log("entro aqui");
            this.items.push({
              title: JSON.stringify(data[i]['name']).toUpperCase().replace(/['"]+/g, ''),
              icon: this.icons[j] ,
              id: parseInt(JSON.stringify(data[i]['id']))      
            });
            console.log("poicon i"+i+" "+this.icons[i]);
              j++;
          }
        }
       
      }
      ,
      err => { console.log(err); }
    );
  }
 
  itemTapped(event, item) {
   
    // That's right, we're pushing to ourselves!
   // this.navCtrl.push('SignupPage');
    this.navCtrl.push('SignupPage', {
     item: item
    });
    console.log(item);
  }
  
  
  abrirSegundaPag() {
  //  this.navCtrl.push("SegundaPage", this.paramsParaSegPag);
  }

}

   
    
  