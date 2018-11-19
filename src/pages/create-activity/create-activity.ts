import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController,ViewController,ToastController } from 'ionic-angular';
import { Items } from '../../providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';




/**
 * Generated class for the CreateActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
export class CreateActivityPage {
  type_activities: Array<{id: number, name: string}>;
  item: any;
  isReadyToSave: boolean;
  form: FormGroup;
  private projectPrivateDescription: string;
  private activityErrorString: string;
  private okActivity: string;
  private dateNow;
  private minDate: string;
  private selectedDate: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,items: Items, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public authServiceProvider: AuthServiceProvider, public viewCtrl:ViewController
    ,public toastCtrl: ToastController, public  translateService:TranslateService,
  ) {
    this.item = navParams.get('item') || items.defaultItem;

    console.log("item", this.item)
    this.type_activities = [];

    this.form = this.formBuilder.group({
      name_activity:['',Validators.required],
      description_activity:['',Validators.required],
      fecha_activity:['', Validators.required],
      lugar_activity:['',Validators.required],
      type_activity_id:[ Validators.required],
    });

    this.translateService.get('ERROR_ACTIVIT_CREATE').subscribe((value) => {
      this.activityErrorString = value;
    });
    this.translateService.get('OK_ACTIVITY').subscribe((value) => {
      this.okActivity = value;
    });

    this.form.valueChanges.subscribe((v)=>{
      this.isReadyToSave= this.form.valid;
    });

     this.minDate = new Date().toISOString();
     this.selectedDate= new Date().toISOString();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateActivityPage');
    console.log('ionViewDidLoad CreateProjectPage');
      let loading = this.loadingCtrl.create({
        content: 'Espera por favor...'
      });
      loading.present();
      this.authServiceProvider.getDataWithJWT('type_activities').subscribe(
        (data) => {
          loading.dismiss();
          console.log("type " + data);
          this.loadTypeActivity(data);
          },err => { console.log(err); }
      );
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  loadTypeActivity(data){
    
    for (let i in data) {
      console.log("entro aqui");
        this.type_activities.push({
          name: JSON.stringify(data[i]['name_type_activity']).toUpperCase().replace(/['"]+/g, ''),
          id: parseInt(JSON.stringify(data[i]['id']))      
      });
       console.log(JSON.stringify(data[i]['name_type_activity']).toUpperCase().replace(/['"]+/g, ''));
       console.log(parseInt(JSON.stringify(data[i]['id'])));
    }

   }

   done() {
    if (!this.form.valid) { return; }
      console.log(JSON.stringify(this.form.value));
      let activity={
        name_activity:this.form.value.name_activity,
        description_activity:this.form.value.description_activity,
        fecha_activity:this.form.value.fecha_activity,
        lugar_activity:this.form.value.lugar_activity,
        status_activity_id:35,
        type_activity_id:this.form.value.type_activity_id,
        project_id:this.item['id'] 
      }
    this.authServiceProvider.postDataJwt(activity,"activities","activity") //ingresa en projects
    .subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: this.okActivity,
          duration: 3000,
          position: 'top'
        });
        toast.present();
       
        this.viewCtrl.dismiss();
      },
      err => { console.log(err); 
       // Unable to sign up
      let toast = this.toastCtrl.create({
      message: this.activityErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present(); }
    );
    
  }

  dateChanged(event){
    this.selectedDate=event;

  }

}
