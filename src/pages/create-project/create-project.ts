import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController,ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CreateProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html',
})
export class CreateProjectPage {
  @ViewChild('fileInput') fileInput;
  
  isReadyToSave: boolean;
  form: FormGroup;
  private signupErrorString: string;
  categories: Array<{id: number, name: string}>;
  spectators: Array<{id: number, name: string}>;
  tags: Array<{id: number, name: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider, 
    public viewCtrl: ViewController, public formBuilder: FormBuilder, 
    public toastCtrl: ToastController,
    public translateService: TranslateService,public loadingCtrl: LoadingController ) {
    this.form = this.formBuilder.group({
      name_project:['',Validators.required],
      description_project:['',Validators.required],
      category_id:[ Validators.required],
      spectator_id:[Validators.required],
      tag_ids: [Validators.required]
    });
    //
    this.categories = [];
    this.spectators=[];
    this.tags=[];
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
   // Watch the form for changes, and
    this.form.valueChanges.subscribe((v)=>{
      this.isReadyToSave= this.form.valid;
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    }); 
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

   ionViewDidLoad() {
      console.log('ionViewDidLoad CreateProjectPage');
      let loading = this.loadingCtrl.create({
        content: 'Espera por favor...'
      });
      loading.present();
      this.authServiceProvider.getDataWithJWT('tags').subscribe((data)=>{
        
        console.log("tags " + data);
        this.loadTags(data);
      }, err => { console.log(err); })

      this.authServiceProvider.getDataWithJWT('categories').subscribe(
        (data) => {
          //loading.dismiss();
          console.log("Category " + data);
          this.loadCategory(data);
          },err => { console.log(err); }
      );
      this.authServiceProvider.getDataWithJWT('spectators').subscribe(
        (data) => {
          loading.dismiss();
          console.log("spectators " + data);
          this.loadSpectator(data);
          },err => { console.log(err); }
      );

   }

  createProject(){
  }
  done() {

    console.log("entro aca545");
    if (!this.form.valid) { return; }
    console.log(JSON.stringify(this.form.value));
    this.authServiceProvider.postDataJwt(this.form.value,"projects","project")
    .subscribe(
      data => {
        this.createHasMany(data);
        let toast = this.toastCtrl.create({
          message: "Se agrego el proyecto :)",
          duration: 3000,
          position: 'top'
        });
        toast.present(); 
        
        this.viewCtrl.dismiss();

      },
      err => { console.log(err); 
       // Unable to sign up
    let toast = this.toastCtrl.create({
      message: this.signupErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present(); }
    );

    
  }

  cancel(){
   this.viewCtrl.dismiss();
  }

  createHasMany(data){
    console.log("es de proyecto  "+ data);
    let id=localStorage.getItem("token");
    this.authServiceProvider.getData("user_firebases/"+id)
    .subscribe(
      result => {
        console.log("es un resul "+JSON.stringify(result));
        let user= JSON.stringify(result['user_id']).toUpperCase().replace(/['"]+/g, '');
        let proyecto =JSON.stringify(data['id']).toUpperCase().replace(/['"]+/g, '');
        console.log(user);
        console.log(proyecto);
        
        let dataP = '{"user_id":'+user+', "project_id":'+proyecto+', "rol":true}';
       this.authServiceProvider.postDataJwt(dataP,"has_user_projects","has_user_project")
       .subscribe(result =>{
           console.log(result +"registro")
        });
        
      },
      err => {
       console.log(err);
      }
    );

       
  }

 
}

  



