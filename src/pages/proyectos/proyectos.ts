import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public  modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyectosPage');
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
