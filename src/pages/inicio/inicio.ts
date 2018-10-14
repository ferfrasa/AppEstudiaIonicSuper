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
    this.images = ['bjork-live.jpg',  'badu-live.png','advance-card-tmntr.jpg'];
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
