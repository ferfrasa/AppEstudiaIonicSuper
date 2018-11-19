import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

import { Items } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  projects_tags: Array<{nombre: string, color:string}>;
  private projectJoinErrorString: string;
  private projetcJoinOkString: string;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, 
    public authServiceProvider: AuthServiceProvider,public translateService: TranslateService,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.item = navParams.get('item')||-1;
    this.projects_tags=[];

    this.translateService.get('JOIN_PROJECT_ERROR').subscribe((value) => {
      this.projectJoinErrorString = value;
    });
    this.translateService.get('JOIN_PROJECT').subscribe((value) => {
      this.projetcJoinOkString = value;
    });

    if(this.item==-1){
      this.navCtrl.push('InicioPage');
    }
      
    
  }
  ionViewDidLoad() {
   
  
    this.authServiceProvider.getDataWithJWT("has_project_tags/"+this.item.id).subscribe((data)=>{
      // para llenar datos de user proyectos actuales
      for (let i in data) {
        this.projects_tags.push(
          {nombre: data[i]['tag']['name_tag'],
          color: data[i]['tag']['color_tag']
          });
          console.log(data[i]['tag']['name_tag']);
          console.log(data[i]['tag']['color_tag']);
      }
    
    },err => { console.log(err); });

   
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
      this.navCtrl.push('InicioPage');
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



}
