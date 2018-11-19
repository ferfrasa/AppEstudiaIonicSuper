import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MyProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-project-detail',
  templateUrl: 'my-project-detail.html',
})
export class MyProjectDetailPage {
  item: any;
  projects_tags: Array<{nombre: string, color:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,items: Items, public authServiceProvider: AuthServiceProvider,) {
    this.item = navParams.get('item') || -1;
    console.log(this.item)
    this.projects_tags=[];

    if(this.item==-1){
      this.navCtrl.push('ProyectosPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProjectDetailPage');

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

}
