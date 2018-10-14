import { ProfesorRol, EstudianteRol, Admin } from './../index';
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
  
  projects_create: Array<{id: number, name: string, description:string, partic: number, prom:number, img:string}>;
  projects_join: Array<{id: number, name: string, description:string, partic: number, prom:number, img:string}>;
  pet: any;
  images: string[];
  categories: Array<{id: number, name: string}>;
  spectators: Array<{id: number, name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public  modalCtrl: ModalController,public authServiceProvider: AuthServiceProvider) {
      this.categories=[];
      this.icons=[];
      this.projects_create=[]; 
      this.projects_join=[];
      this.categories=[];
      this.spectators=[];
      this.pet="creator";
      this.images = ['bear.jpg',  'duck.jpg','eagle.jpg'];
    
  }
  ionViewDidLoad() {
    //this.menu.enable(true);
    console.log('ionViewDidLoad InicioPage'); 
    this.authServiceProvider.getDataWithJWT("project_users/"+localStorage.getItem("user")).subscribe((data)=>{
        
      console.log("data de proyectos " + JSON.stringify(data));

      console.log("data " + data);
      for (let i in data) {
        if(data[i]['rol']==true && data[i]['category_id']!=9 ){
         this.llenarArrayProject(this.projects_create,data,i);

        }else if(data[i]['category_id']!=9){
          this.llenarArrayProject(this.projects_join,data,i);
        }
      }
      this.authServiceProvider.getDataWithJWT('categories').subscribe(
        (data) => {
          //loading.dismiss();
          console.log("Category " + data);
          this.loadCategory(data);
          this.authServiceProvider.getDataWithJWT('spectators').subscribe(
            (data) => {
             
              console.log("spectators " + data);
              this.loadSpectator(data);
              },err => { console.log(err); }
          );
          },err => { console.log(err); }
      );
    }, err => { console.log(err); })
  }

  llenarArrayProject(array, data, posicion){
    console.log("data true " + data[posicion]['rol']);
    console.log("entro aqui creados ");
    array.push({
     id: parseInt(JSON.stringify(data[posicion]['proyecto'])),
     name: JSON.stringify(data[posicion]['name_project']).toUpperCase().replace(/['"]+/g, ''),
     description: JSON.stringify(data[posicion]['description_project']).replace(/['"]+/g, ''),
     partic: 0,
     //partic: parseInt(JSON.stringify(data[i]['participantes'])),
     prom: parseInt(JSON.stringify(data[posicion]['prom_calif_project'])),
     img: "assets/img/"+this.images[Math.floor(Math.random() * this.images.length)],
  
       
    });

  }

  loadCategory(data){
    
    for (let i in data) {
      console.log("entro aqui");
        this.categories.push({
          name: JSON.stringify(data[i]['name_category']).toUpperCase().replace(/['"]+/g, ''),
          id: parseInt(JSON.stringify(data[i]['id']))      
      });
       console.log(JSON.stringify(data[i]['name_category']).toUpperCase().replace(/['"]+/g, ''));
       console.log(parseInt(JSON.stringify(data[i]['id'])));
    }

   }
   loadSpectator(data){
   
    for (let i in data) {
      console.log("entro aqui");
        this.spectators.push({
          name: JSON.stringify(data[i]['name_spectator']).toUpperCase().replace(/['"]+/g, ''),
          id: parseInt(JSON.stringify(data[i]['id']))      
      });
      console.log(JSON.stringify(data[i]['name_spectator']).toUpperCase().replace(/['"]+/g, ''));
       console.log(parseInt(JSON.stringify(data[i]['id'])));
    }

   }
 
  addProject(){
     let modalCreate = this.modalCtrl.create('CreateProjectPage');
     modalCreate.onDidDismiss(project =>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
     })
     modalCreate.present();
  }
  validarRolActual(){
    if(localStorage.getItem("user_type") == ProfesorRol ||
        localStorage.getItem("user_type")== EstudianteRol || 
        localStorage.getItem("user_type") == Admin){
      return true;
    }else{
      this.pet="participant";
      return false;
    }
  }
  viewProject(event,item){
    this.navCtrl.push('MyProjectDetailPage', {
      item: item
    });
  }

}
