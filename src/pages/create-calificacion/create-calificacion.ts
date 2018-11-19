import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';



/**
 * Generated class for the CreateCalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-calificacion',
  templateUrl: 'create-calificacion.html',
})
export class CreateCalificacionPage {

  isReadyToSave: boolean;
  form: FormGroup;
  item: any;


  private projectPrivateDescription: string;
  private projectErrorString: string;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    public navParams: NavParams,public viewCtrl:ViewController,public  translateService:TranslateService,
     public toastCtrl: ToastController,public authServiceProvider: AuthServiceProvider ) {
      this.item = navParams.get('item')

    
      this.form = this.formBuilder.group({
      comentario:['',Validators.required],
      calificacion:['',Validators.required]
    });

    this.translateService.get('ERROR_PROJECT_CREATE').subscribe((value) => {
      this.projectErrorString = value;
    });
    this.translateService.get('CODE_PROJECT').subscribe((value) => {
     // this.codeProject = value;
    });

    this.translateService.get('MESSAGE_PRIVATE').subscribe((value)=>{
      this.projectPrivateDescription= value;
    });
    this.form.valueChanges.subscribe((v)=>{
      this.isReadyToSave= this.form.valid;
    });
  }
    
    done() {
      if (!this.form.valid) { return; }
      console.log(JSON.stringify(this.form.value));
      let appreciation={
        comentario:this.form.value.comentario,
        calificacion:this.form.value.calificacion,
        user_id:localStorage.getItem("user"),
        activity_id:this.item['id']
        
      }
  
      this.authServiceProvider.postDataJwt(appreciation,"appreciations","appreciation") //ingresa en projects
      .subscribe(
        data => {
          let toast = this.toastCtrl.create({
            message: "BIEN",
            duration: 3000,
            position: 'top'
          });
          toast.present(); 
         
          this.viewCtrl.dismiss();
        },
        err => { console.log(err); 
         // Unable to sign up
        let toast = this.toastCtrl.create({
        message: this.projectErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present(); }
      );
      
    }



  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCalificacionPage');
  }

  cancel(){
    this.viewCtrl.dismiss();
   }
 

}
