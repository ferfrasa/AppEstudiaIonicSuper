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
  projects: Array<{id: number, name: string, description:string, partic: number, prom:number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public  modalCtrl: ModalController,public authServiceProvider: AuthServiceProvider) {
      this.categories=[];
      this.icons=[];
      this.projects=[]; 
    
  }
  ionViewDidLoad() {
    //this.menu.enable(true);
    console.log('ionViewDidLoad InicioPage'); 
    this.authServiceProvider.getDataWithJWT("project_users/"+localStorage.getItem("user")).subscribe((data)=>{
        
      console.log("data de proyectos " + JSON.stringify(data));

      console.log("data " + data);
      for (let i in data) {
         
        console.log("entro aqui");
          this.projects.push({
           id: parseInt(JSON.stringify(data[i]['proyecto'])),
           name: JSON.stringify(data[i]['name_project']).toUpperCase().replace(/['"]+/g, ''),
           description: JSON.stringify(data[i]['description_project']).replace(/['"]+/g, ''),
           partic: 0,
           //partic: parseInt(JSON.stringify(data[i]['participantes'])),
           prom: parseInt(JSON.stringify(data[i]['prom_calif_project'])),
          
            //img: this.icons[i]
             
          }); 
      }
     /* for (let i in data) {
         
        console.log("entro aqui");
          this.projects.push({
           id: parseInt(JSON.stringify(data[i]['id'])),
           name: JSON.stringify(data[i]['name_project']).toUpperCase().replace(/['"]+/g, ''),
           description: JSON.stringify(data[i]['description_project']).replace(/['"]+/g, ''),
           partic: parseInt(JSON.stringify(data[i]['participantes'])),
           prom: parseInt(JSON.stringify(data[i]['prom_calif_project'])),
          
            //img: this.icons[i]
             
          }); 
      }*/
     
    }, err => { console.log(err); })
  }
  /*ionViewDidLoad() {
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
  }*/

  addProject(){
     let modalCreate = this.modalCtrl.create('CreateProjectPage');
     modalCreate.onDidDismiss(project =>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
     })
     modalCreate.present();
  }

}
