import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proyectos',
  templateUrl: 'proyectos.html',
})
export class ProyectosPage {
  icons: string[];
  categories: Array<{id: number, name: string, img:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public  modalCtrl: ModalController,public authServiceProvider: AuthServiceProvider) {
      this.categories=[];
      this.icons=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyectosPage');

    this.authServiceProvider.getDataWithJWT('categories').subscribe((data)=>{
        
      console.log("tags " + data);
      for (let i in data) {
         
        console.log("entro aqui");
          this.categories.push({
            id: parseInt(JSON.stringify(data[i]['id'])) ,    
            name: JSON.stringify(data[i]['name_category']).toUpperCase().replace(/['"]+/g, ''),
            img: this.icons[i]
             
          }); 
      }
     
    }, err => { console.log(err); })
  }

  addProject(){
     let modalCreate = this.modalCtrl.create('CreateProjectPage');
     modalCreate.onDidDismiss(project =>{
      if (project) {
        //this.items.add(item);
      }
     })
     modalCreate.present();
  }

}
