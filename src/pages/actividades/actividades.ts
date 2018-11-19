import { Component } from '@angular/core';
import { ProfesorRol, EstudianteRol, Admin } from './../index';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the ActividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-actividades',
  templateUrl: 'actividades.html',
})
export class ActividadesPage {

  activities: Array<{id: number, name: string, description: string, fecha:string, lugar:string, name_project:string,
  status:string,type:string, img:string}>;
  images: string[];
  projects: Array<{id: number, name: string}>;
 

  map: any; // Manejador del mapa.
  coords : any = { lat: 0, lng: 0 }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider, public modalCtrl:ModalController,
    private geolocation: Geolocation,public  platform: Platform) {
      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
          this.obtenerPosicion();
       });
       this.images = ['a.jpg','b.jpg','c.jpg','d.jpg'
       ,'e.jpg','f.jpg','g.jpg','h.jpg','i.jpg','j.jpg','k.jpg','l.jpg','m.jpg','n.jpg','o.jpg','p.jpg',
       'q.jpg','r.jpg','s.jpg','t.jpg','u.jpg','v.jpg','w.jpg','x.jpg','y.jpg','z.jpg','15.jpg','16.jpg','17.jpg','18.jpg',
       '19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg','29.jpg',
       '30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.jpg','38.jpg','39.jpg',
       '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg',
       '50.jpg','51.jpg','52.jpg','53.jpg','54.jpg','55.jpg','56.jpg','57.jpg','5.8jpg','59.jpg',
       '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg',
       '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg', '75.jpg', '76.jpg',];
       this.activities=[];
       this.projects=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActividadesPage');
    this.authServiceProvider.getDataWithJWT("project_users/"+localStorage.getItem("user")).subscribe((data)=>{
        
      console.log("data de proyectos " + JSON.stringify(data));
          console.log("projet " + data);
          this.loadProject(data);
          
    this.authServiceProvider.getDataWithJWT('activity_infos/'+localStorage.getItem("user")).subscribe((data)=>{
      console.log("activities",data);

      console.log("data " + data);
      for (let i in data) {
         this.llenarArrayProject(this.activities,data,i);
      }
    });    
      },err => { console.log(err); }
    );    
  }
  
  selectItem(event){

    for(let item of this.activities){
      if(item.id!=60){
         this.activities.push(item);
      }
    }

       console.log("evento",event)
  }

  llenarArrayProject(array, data, posicion){
    
    array.push({
     id: parseInt(JSON.stringify(data[posicion]['id'])),
     name: JSON.stringify(data[posicion]['name_activity']).toUpperCase().replace(/['"]+/g, ''),
     description: JSON.stringify(data[posicion]['description_activity']).replace(/['"]+/g, ''),
     fecha:JSON.stringify(data[posicion]['fecha_activity']).replace(/['"]+/g, ''),
     lugar:JSON.stringify(data[posicion]['lugar_activity']).replace(/['"]+/g, ''),
     name_project:JSON.stringify(data[posicion]['name_project']).replace(/['"]+/g, ''),
     status:JSON.stringify(data[posicion]['name_status_activity']).replace(/['"]+/g, ''),
     type:JSON.stringify(data[posicion]['name_type_activity']).replace(/['"]+/g, ''),
     //partic: parseInt(JSON.stringify(data[i]['participantes'])),
     img: "assets/img/"+this.images[Math.floor(Math.random() * this.images.length)],
    });

  }
  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  loadMap(){
    let mapContainer = document.getElementById('map');
     this.map = new google.maps.Map(mapContainer, {
       center: this.coords,
       zoom: 12
     });
 }

  actualizarActividad(){

  }
  loadProject(data){
    
    for (let i in data) {
      console.log("entro aqui");
        this.projects.push({
          name: JSON.stringify(data[i]['name_project']).toUpperCase().replace(/['"]+/g, ''),
          id: parseInt(JSON.stringify(data[i]['proyecto']))      
      });
    }

  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    /*this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });*/
  }

  addActivity(){
   
      let modalCreate = this.modalCtrl.create('CreateActivityPage');
      modalCreate.onDidDismiss(project =>{
       this.navCtrl.setRoot(this.navCtrl.getActive().component);
      })
      modalCreate.present();
   

  }
  listProject(){
    
      this.navCtrl.push('ListProjectPage');
    
  
  }

  cargarActividades (){
    
  }
  validarRolActual(){
    if(localStorage.getItem("user_type") == ProfesorRol ||
        localStorage.getItem("user_type")== EstudianteRol || 
        localStorage.getItem("user_type") == Admin){
      return true;
    }else{
      return false;
    }
  }
  calificar(event,item){
    let modalCreate = this.modalCtrl.create('CreateCalificacionPage',{
      item: item
    });
    modalCreate.onDidDismiss(project =>{
     this.navCtrl.setRoot(this.navCtrl.getActive().component);
    })
    modalCreate.present();
 }

 verComentarios(event,item){
  let modalCreate = this.modalCtrl.create('ComentarioActividadPage',{
    item: item
  });
  modalCreate.onDidDismiss(project =>{
  // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  })
  modalCreate.present();
}
}
