import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirstRunPage ,ProfesorRol, EstudianteRol, Admin,ComerciantesRol,LiderColegioRol} from './../index';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private nombre:string;
  private email:string;
  private rol:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


   
    this.nombre=localStorage.getItem('name').toUpperCase().replace(/['"]+/g, '');
    this.email= localStorage.getItem('email').toUpperCase().replace(/['"]+/g, '');

    
      if(localStorage.getItem("user_type") == ProfesorRol){this.rol="PROFESOR UNIVERSIDAD"}
      if(localStorage.getItem("user_type") == EstudianteRol){this.rol="ESTUDIANTE"}
      if(localStorage.getItem("user_type") == Admin){this.rol="ADMIN"}
      if(localStorage.getItem("user_type") == ComerciantesRol){this.rol="COMERCIANTE"}
      if(localStorage.getItem("user_type") ==LiderColegioRol){this.rol="LIDER DE COLEGIO"}



       
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
