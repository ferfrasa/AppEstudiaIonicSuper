import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  projects: Array<{id: number, name: string, description:string, partic: number, prom:number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController, public authServiceProvider: AuthServiceProvider) {
    this.projects=[];
  }
 
  ionViewDidLoad() {
    this.menu.enable(true);
    console.log('ionViewDidLoad InicioPage');
    this.authServiceProvider.getDataWithJWT('listps').subscribe((data)=>{
        
      console.log("tags " + data);
      for (let i in data) {
         
        console.log("entro aqui");
          this.projects.push({
           id: parseInt(JSON.stringify(data[i]['id'])),
           name: JSON.stringify(data[i]['name_project']).toUpperCase().replace(/['"]+/g, ''),
           description: JSON.stringify(data[i]['description_project']).replace(/['"]+/g, ''),
           partic: parseInt(JSON.stringify(data[i]['participantes'])),
           prom: parseInt(JSON.stringify(data[i]['prom_calif_project'])),
          
            //img: this.icons[i]
             
          }); 
      }
     
    }, err => { console.log(err); })
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(false);
  }

}
