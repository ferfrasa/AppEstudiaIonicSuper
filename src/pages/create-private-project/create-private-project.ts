import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, AlertController, ToastController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the CreatePrivateProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-private-project',
  templateUrl: 'create-private-project.html',
})
export class CreatePrivateProjectPage {

  isReadyToSave: boolean;
  form: FormGroup;

  private projectPrivateDescription: string;
  private projectErrorString: string;
  private codeProject: string;

  categories: Array<{id: number, name: string}>;
  spectators: Array<{id: number, name: string}>;
  tags: Array<{id: number, name: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,  public authServiceProvider: AuthServiceProvider,
    public loadingCtrl:LoadingController, public viewCtrl:ViewController, public alertController: AlertController,
    public  translateService:TranslateService, public toastCtrl: ToastController  ) {


    this.form = this.formBuilder.group({
      name_project:['',Validators.required],
      description_project:['',Validators.required],
      category_id:[ Validators.required],
      spectator_id:[Validators.required],
      tag_ids: [Validators.required]
    });

    this.translateService.get('ERROR_PROJECT_CREATE').subscribe((value) => {
      this.projectErrorString = value;
    });
    this.translateService.get('CODE_PROJECT').subscribe((value) => {
      this.codeProject = value;
    });

    this.translateService.get('MESSAGE_PRIVATE').subscribe((value)=>{
      this.projectPrivateDescription= value;
    });
    //
    this.categories = [];
    this.spectators=[];
    this.tags=[];

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v)=>{
      this.isReadyToSave= this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePrivateProjectPage');
    console.log('ionViewDidLoad CreateProjectPage');
      let loading = this.loadingCtrl.create({
        content: 'Espera por favor...'
      });
      loading.present();
      this.authServiceProvider.getDataWithJWT('tags').subscribe((data)=>{
        
        console.log("tags " + data);
        this.loadTags(data);
        this.authServiceProvider.getDataWithJWT('categories').subscribe(
          (data) => {
            //loading.dismiss();
            console.log("Category " + data);
            this.loadCategory(data);
            this.authServiceProvider.getDataWithJWT('spectators').subscribe(
              (data) => {
                loading.dismiss();
                console.log("spectators " + data);
                this.loadSpectator(data);
                },err => { console.log(err); }
            );
            },err => { console.log(err); }
        );
      }, err => { console.log(err); })

  }
  loadTags(data){
  
    for (let i in data) {
      console.log("entro aqui");
        this.tags.push({
          name: JSON.stringify(data[i]['name_tag']).toUpperCase().replace(/['"]+/g, ''),
          id: parseInt(JSON.stringify(data[i]['id']))      
      });
      console.log(JSON.stringify(data[i]['name_tag']).toUpperCase().replace(/['"]+/g, ''));
      console.log(parseInt(JSON.stringify(data[i]['id'])));
    }
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
   cancel(){
    this.viewCtrl.dismiss();
   }

   done() {
    if (!this.form.valid) { return; }
    console.log(JSON.stringify(this.form.value));

    this.authServiceProvider.postDataJwt(this.form.value,"projects","project") //ingresa en projects
    .subscribe(
      data => {
        let code= data['code_project'];
        
        // lalma la funcion create hasMany QUE AGREGA A TABLA HAS_PROJECT
        this.createHasMany(data).subscribe(()=>{
        
          this.showAlert(code);

        });
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

  createHasMany(data){
    console.log("es de proyecto  "+ data);
    let creador=true;
    let proyecto =JSON.stringify(data['id']).toUpperCase().replace(/['"]+/g, '');
    let user= localStorage.getItem("user");
    let dataP = '{"user_id":'+user+', "project_id":'+proyecto+', "rol":'+creador+'}';
    return this.authServiceProvider.postDataJwt2(dataP,"has_user_projects","has_user_project");  
  }

  showAlert(result){
    const alert = this.alertController.create({
      title: this.codeProject,
      subTitle: this.projectPrivateDescription+ "\n \n \n"+result+".",
      buttons: ['OK'],

    });
    alert.present();
  }
  

}
