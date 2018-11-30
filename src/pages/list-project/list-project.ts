import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the ListProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-project',
  templateUrl: 'list-project.html',
})
export class ListProjectPage {

  images: string[];
  projects_create: Array<{id: number, name: string, description:string, partic: number, prom:number, img:string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams,public authServiceProvider: AuthServiceProvider,public modalCtrl:ModalController) {
    this.projects_create=[];
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
    console.log('ionViewDidLoad ListProjectPage');
    this.authServiceProvider.getDataWithJWT("project_users/"+localStorage.getItem("user")).subscribe((data)=>{
        
      console.log("data de proyectos " + JSON.stringify(data));

      console.log("data " + data);
      for (let i in data) {
        if(data[i]['rol']==true /*&& data[i]['category_id']!=9*/ ){
         this.llenarArrayProject(this.projects_create,data,i);
        }
      }
      
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

  addActivity(event,item){
    let modalCreate = this.modalCtrl.create('CreateActivityPage',{
      item: item
    });
    modalCreate.onDidDismiss(project =>{
     this.navCtrl.setRoot(this.navCtrl.getActive().component);
    })
    modalCreate.present();
 

}

}
