import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController,ToastController, LoadingController } from 'ionic-angular';
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
  private projectErrorString: string;
  private projetcOkString: string;
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
    this.translateService.get('ERROR_PROJECT_CREATE').subscribe((value) => {
      this.projectErrorString = value;
    });
    this.translateService.get('OK_PROJECT').subscribe((value) => {
      this.projetcOkString = value;
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

      
    /*  this.authServiceProvider.getDataWithJWT('spectators').subscribe(
        (data) => {
          loading.dismiss();
          console.log("spectators " + data);
          this.loadSpectator(data);
          },err => { console.log(err); }
      );*/

   }

  createProject(){
  }
  done() {

    console.log("entro aca545");
    if (!this.form.valid) { return; }
    console.log(JSON.stringify(this.form.value));

    this.authServiceProvider.postDataJwt(this.form.value,"projects","project") //ingresa en projects
    .subscribe(
      data => {
        // lalma la funcion create hasMany QUE AGREGA A TABLA HAS_PROJECT
        this.createHasMany(data).subscribe(()=>{

          let toast = this.toastCtrl.create({
            message: this.projetcOkString,
            duration: 3000,
            position: 'top'
          });
          toast.present(); 
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

  cancel(){
   this.viewCtrl.dismiss();
  }

  createHasMany(data){
    console.log("es de proyecto  "+ data);
    let creador=true;
    let proyecto =JSON.stringify(data['id']).toUpperCase().replace(/['"]+/g, '');
    let user= localStorage.getItem("user");
    let dataP = '{"user_id":'+user+', "project_id":'+proyecto+', "rol":'+creador+'}';
    return this.authServiceProvider.postDataJwt2(dataP,"has_user_projects","has_user_project");  
  }
}

  



