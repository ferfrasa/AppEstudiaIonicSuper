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
  
  projects_create: Array<{id: number, name: string, description:string, partic: number, prom:number, img:string, category_id:string,category:string,spectator_id:string,spectator:string, fecha:string}>;
  projects_join:   Array<{id: number, name: string, description:string, partic: number, prom:number, img:string, category_id:string,category:string,spectator_id:string,spectator:string, fecha:string}>;
 

 
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
      this.images = ['a.jpg','b.jpg','c.jpg','d.jpg'
      ,'e.jpg','f.jpg','g.jpg','h.jpg','i.jpg','j.jpg','k.jpg','l.jpg','m.jpg','n.jpg','o.jpg','p.jpg',
      'q.jpg','r.jpg','s.jpg','t.jpg','u.jpg','v.jpg','w.jpg','x.jpg','y.jpg','z.jpg','15.jpg','16.jpg','17.jpg','18.jpg',
      '19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg','29.jpg',
      '30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.jpg','38.jpg','39.jpg',
      '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg',
      '50.jpg','51.jpg','52.jpg','53.jpg','54.jpg','55.jpg','56.jpg','57.jpg','58.jpg','59.jpg',
      '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg',
      '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg', '75.jpg', '76.jpg',];
    
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
    // partic: 0,
     //partic: parseInt(JSON.stringify(data[i]['participantes'])),
     prom: parseInt(JSON.stringify(data[posicion]['prom_calif_project'])),
     img: "assets/img/"+this.images[Math.floor(Math.random() * this.images.length)],

     category_id:JSON.stringify(data[posicion]['category_id']).toUpperCase().replace(/['"]+/g, ''),
     category:JSON.stringify(data[posicion]['name_category']).toUpperCase().replace(/['"]+/g, ''),
    spectator_id:JSON.stringify(data[posicion]['spectator_id']).toUpperCase().replace(/['"]+/g, ''),
    spectator:JSON.stringify(data[posicion]['name_spectator']).toUpperCase().replace(/['"]+/g, ''),
    fecha:JSON.stringify(data[posicion]['fecha']).toUpperCase().replace(/['"]+/g, ''),
  
       
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
    console.log("itt",item)
    this.navCtrl.push('MyProjectDetailPage', {
      item: item
    });
  }

  editProject(event,item){

    let modalCreate = this.modalCtrl.create('EditprojectPage',{
      item: item
    });
    modalCreate.onDidDismiss(project =>{
     this.navCtrl.setRoot(this.navCtrl.getActive().component);
    })
    modalCreate.present();
    console.log("itt",item)
    
  }

  

}
