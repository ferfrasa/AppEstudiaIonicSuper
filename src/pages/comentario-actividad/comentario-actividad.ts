import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the ComentarioActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentario-actividad',
  templateUrl: 'comentario-actividad.html',
})
export class ComentarioActividadPage {

  comentarios: Array<{id: number, calificacion: string,comentario:string ,usuario:string, fecha:string, img:string}>;
  item: any;
  img:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider,public viewCtrl:ViewController) {
    this.item = navParams.get('item')
    this.comentarios=[];
    this.img="assets/img/logo.png"

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentarioActividadPage');
    this.authServiceProvider.getDataWithJWT("appr_users/"+this.item.id).subscribe((data)=>{
        
      console.log("comwentarios " + JSON.stringify(data));

      for (let i in data) {
        console.log("data",data)
         this.llenarArrayProject(this.comentarios,data,i);
      }
      
      
    }, err => { console.log(err); })
  }

  llenarArrayProject(array, data, posicion){

    array.push({
      id: parseInt(JSON.stringify(data[posicion]['id'])),
      calificacion: JSON.stringify(data[posicion]['calificacion']),
      comentario: JSON.stringify(data[posicion]['comentario']).toUpperCase().replace(/['"]+/g, ''),
      fecha: JSON.stringify(data[posicion]['fecha']),
      usuario: JSON.stringify(data[posicion]['name']).toUpperCase().replace(/['"]+/g, ''),
      img:this.img
     });

     console.log("array",array);
     console.log("coemtario",this.comentarios)
  }

  cancel(){
    this.viewCtrl.dismiss();
  }


}
