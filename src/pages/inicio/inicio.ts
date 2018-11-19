import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,ToastController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Todos, Comerciantes,Profesor, LiderColegio , Estudiante, ComerciantesRol, EstudianteRol, ProfesorRol,LiderColegioRol} from '../index';

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
  projects: Array<{id: number, name: string, description:string, partic: number, prom:number, 
    spectator:number, category:string, img:string, code:string, status_project:boolean,
    fecha:string, name_category:string, name_spectator:string }>;  
    
  projects_user: Array<{id: string}>;
  images: string[];
  pet: any;
  
  private projectJoinErrorString: string;
  private projetcJoinOkString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,
      public authServiceProvider: AuthServiceProvider,public translateService: TranslateService,
      public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.projects=[];
    this.projects_user=[];
    this.images = ['a.jpg','b.jpg','c.jpg','d.jpg'
       ,'e.jpg','f.jpg','g.jpg','h.jpg','i.jpg','j.jpg','k.jpg','l.jpg','m.jpg','n.jpg','o.jpg','p.jpg',
       'q.jpg','r.jpg','s.jpg','t.jpg','u.jpg','v.jpg','w.jpg','x.jpg','y.jpg','z.jpg','15.jpg','16.jpg','17.jpg','18.jpg',
       '19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg','29.jpg',
       '30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.jpg','38.jpg','39.jpg',
       '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg',
       '50.jpg','51.jpg','52.jpg','53.jpg','54.jpg','55.jpg','56.jpg','57.jpg','5.8jpg','59.jpg',
       '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg',
       '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg', '75.jpg', '76.jpg',];
    this.pet = "for_me";
    this.translateService.get('JOIN_PROJECT_ERROR').subscribe((value) => {
      this.projectJoinErrorString = value;
    });
    this.translateService.get('JOIN_PROJECT').subscribe((value) => {
      this.projetcJoinOkString = value;
    });


  }
 
  ionViewDidLoad() {
    this.menu.enable(true);
    console.log('ionViewDidLoad InicioPage');
    this.authServiceProvider.getDataWithJWT("has_user_projects/"+localStorage.getItem("user")).subscribe((data)=>{
      // para llenar datos de user proyectos actuales
      for (let i in data) {
        this.projects_user.push(
          {id: JSON.stringify(data[i]['project']['id'])
          });
          
      }
      // llamada a la lista de proyectos disponibles 
      this.authServiceProvider.getDataWithJWT('listps').subscribe((data)=>{
      
        // recorrer lo quw trajo los datos para validar
        for (let i in data) {
          let esta= this.quitarProjectUser(data[i]['id']); // validar los que tiene el user
          if(esta==false ){
            continue;
          } //valida que se muestre segun rol del perfil 
          else if(data[i]['spectator_id']==Todos || data[i]['spectator_id']==this.findRol()){
 
            this.projects.push({
                id: parseInt(JSON.stringify(data[i]['id'])),
                name: data[i]['name_project'].toUpperCase(),
                description: data[i]['description_project'],
                partic: parseInt(JSON.stringify(data[i]['participantes'])),
                prom: parseInt(JSON.stringify(data[i]['prom_calif_project'])),
                spectator: data[i]['spectator_id'],
                category: data[i]['category_id'],
                img: "assets/img/"+this.images[Math.floor(Math.random() * this.images.length)],
                code: data[i]['code_project'],
                status_project: data[i]['status_project'],
                fecha: data[i]['fecha'], 
                name_category: data[i]['name_category'], 
                name_spectator: data[i]['name_spectator']
              //img: this.icons[i]  
            }); 
            console.log("koko"+data[i]['fecha']);
          }else{
            continue;
          }
        }
      }, err => { console.log(err); })
    },err => { console.log(err); });

   
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menu.enable(false);
  }
  findRol(){
    switch(localStorage.getItem('user_type')) { 

      case ComerciantesRol: { 
        return Comerciantes;
         //break; 
      } 
      case ProfesorRol: { 
         return Profesor; 
        // break; 
      }
      case EstudianteRol: { 
        return Estudiante; 
       // break; 
      }
      case LiderColegioRol: { 
        return LiderColegio; 
        //break; 
      } 
      default: { 
         return Todos;
         //break; 
      } 
   }
      
  }

  findTodos(){
    return Todos;
  }
  joinProject(event, item){
    let creador= false;
    let project=JSON.stringify(item["id"]);
    let dataP = '{"user_id":'+localStorage.getItem("user")+', "project_id":'+project+', "rol":'+creador+'}';
    let loading = this.loadingCtrl.create({
      content: 'Espera por favor...'
    });
    loading.present();
    //return this.authServiceProvider.postDataJwt2(dataP,"has_user_projects","has_user_project");  
    this.authServiceProvider.postDataJwt2(dataP, "has_user_projects","has_user_project")
    .subscribe(result=>{
     
     
      console.log('registro');
      loading.dismiss();
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      let toast = this.toastCtrl.create({
        message: this.projetcJoinOkString,
        duration: 3000,
        position: 'top'
      });
      toast.present(); 
      
    }),error =>{
      console.log(error);
      let toast = this.toastCtrl.create({
        message: this.projectJoinErrorString,
        duration: 3000,
        position: 'top'
      });
    }
  }
  viewProject(event,item){
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  quitarProjectUser(data){
    let esta= true;
    for(let j in this.projects_user){    
      if( data == this.projects_user[j].id){
        esta = false;
      }
    }
    return esta;
  }

}
