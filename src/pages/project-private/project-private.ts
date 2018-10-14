import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController,ToastController} from 'ionic-angular';
import { ProfesorRol, Admin } from './../index';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ProjectPrivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-private',
  templateUrl: 'project-private.html',
})
export class ProjectPrivatePage {
  projects_create: Array<{id: number, name: string, description:string, partic: number, prom:number, img:string, code:string}>;
  images: string[];
  
  
  private menssageJoin: string;
  private codeProject: string;
  private cancelString: string;
  private searchString: string;
  private validateCode: string;
  private messageNotFound: string;
  private projetcJoinOkString: string;
  private projectJoinErrorString: string;

  
  private_project: Array<{id: number, name: string, description:string, partic: number, prom:number, 
  spectator:number, category:string, img:string, code:string, status_project:boolean,
  fecha:string, name_category:string, name_spectator:string} >;
    

 

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController:AlertController,
    public modalController: ModalController,public authServiceProvider: AuthServiceProvider,
    public  translateService:TranslateService,public toastCtrl: ToastController) {
    this.projects_create=[]; 
    this.images = ['bear.jpg',  'duck.jpg','eagle.jpg'];
    this.private_project=[];
   
    this.translateService.get('CODE_PROJECT').subscribe((value) => {
      this.codeProject = value;
    });
    this.translateService.get('MESSAGE_JOIN_PRIVATE').subscribe((value) => {
      this.menssageJoin = value;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((value)=>{
      this.cancelString= value;
    });

    this.translateService.get('TAB2_TITLE').subscribe((value)=>{
      this.searchString=value;
    });
    this.translateService.get('MESSAGE_VALIDATION_PRIVATE_PROJECT').subscribe((value)=>{
      this.validateCode=value;
    });
    
    this.translateService.get('MESSAGE_NOT_FOUND').subscribe((value)=>{
      this.messageNotFound=value;
    });
    this.translateService.get('JOIN_PROJECT_ERROR').subscribe((value) => {
      this.projectJoinErrorString = value;
    });
    this.translateService.get('JOIN_PROJECT').subscribe((value) => {
      this.projetcJoinOkString = value;
    });
    
    this.buscarProjectP();

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPrivatePage');
     //this.menu.enable(true);
     console.log('ionViewDidLoad InicioPage'); 
     this.authServiceProvider.getDataWithJWT("project_users/"+localStorage.getItem("user")).subscribe((data)=>{
         
       console.log("data de proyectos " + JSON.stringify(data));
 
       console.log("data " + data);
       for (let i in data) {
         if(data[i]['category_id'] == 9){
          this.llenarArrayProject(this.projects_create,data,i);
 
         }
       }
      
     }, err => { console.log(err); })
  }

  validarRolActual(){
    if(localStorage.getItem("user_type") == ProfesorRol ||
        localStorage.getItem("user_type") == Admin){
      return true;
    }else{
      
      return false;
    }
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
     code: data[posicion]['code_project']
  
       
    });

  }

  addProjectPrivate(){
    let modalCreate = this.modalController.create('CreatePrivateProjectPage');
    modalCreate.onDidDismiss(privatePro=>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    })
    modalCreate.present();

  }

  joinProjectPrivate(){
  
    const prompt = this.alertController.create({
      title: this.codeProject,
      message:this.menssageJoin,
      inputs: [
      {
        name: this.codeProject,
        placeholder: this.codeProject
      },
      ],
        buttons: [
        {
          text: this.cancelString,
          handler: data => {
          console.log('Cancel clicked');
          }
        },
        {
          text: this.searchString,
          handler: data => {
         // alert(JSON.stringify(data));
          console.log('Saved clicked');
          if (data[this.codeProject]=='') {
            prompt.setMessage(this.validateCode);
            return false;
            } else {
              let devolvio =this.findProject(data[this.codeProject]);
                if(!devolvio){
                   prompt.setMessage(this.messageNotFound);
                   return false;
                }else{
                   this.joinProject(devolvio);
                   
                }
              }
            }
          }
        ]
      });
      prompt.present();
    
  }

  buscarProjectP(){
     // llamada a la lista de proyectos disponibles 
     this.authServiceProvider.getDataWithJWT('listps').subscribe((data)=>{
      // recorrer lo quw trajo los datos para validar
     for (let i in data) {
      if(data[i]['category_id']==9){
     
      this.private_project.push({
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
       /* id: parseInt(JSON.stringify(data[i]['id'])),
        name: data[i]['name_project'].toUpperCase(),
        code: data[i]['code_project'],   */
        });         
        }
      }
    
  },err => { console.log(err); });

  }

  findProject(data){
    for (let item of this.private_project){
       if(item.code==data){
          return item;
       }
    }
    return false;
  }

  joinProject(data){
    
    let creador=false;
    let proyecto =data['id'];
    let user= localStorage.getItem("user");

  
      this.navCtrl.push('ItemDetailPage', {
        item: data
      });
    }
    /*let dataP = '{"user_id":'+user+', "project_id":'+proyecto+', "rol":'+creador+'}';
    console.log(proyecto+"mi id peroyecto");
    this.authServiceProvider.postDataJwt2(dataP,"has_user_projects","has_user_project")
    .subscribe((result)=>{
         // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.projetcJoinOkString,
        duration: 3000,
        position: 'top'
      });
       toast.present(); 
     },err => { 
      console.log(err); 
        let toast = this.toastCtrl.create({
          message: this.projectJoinErrorString,
          duration: 3000,
          position: 'top'
        }); toast.present(); 
        
      });
  }*/
}
  

