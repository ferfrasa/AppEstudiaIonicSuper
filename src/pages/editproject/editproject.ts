import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';




/**
 * Generated class for the EditprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editproject',
  templateUrl: 'editproject.html',
})
export class EditprojectPage {
  @ViewChild('fileInput') fileInput;
  
  projecto:any;
  isReadyToSave: boolean;
  form: FormGroup;
  private projectErrorString: string;
  private projetcOkString: string;
  projects_tags: Array<{id:number,nombre: string, color:string}>;

  categories: Array<{id: number, name: string}>;
  spectators: Array<{id: number, name: string}>;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider, 
    public viewCtrl: ViewController, public formBuilder: FormBuilder, 
    public toastCtrl: ToastController,
    public translateService: TranslateService,public loadingCtrl: LoadingController) {

      this.projecto = navParams.get('item') 

      
      //
      this.categories = [];
      this.spectators=[];
      this.projects_tags=[];
      
      
      this.translateService.get('EDIT_PROJECT_ERROR').subscribe((value) => {
        this.projectErrorString = value;
      });
      this.translateService.get('EDIT_PROJECT_OK').subscribe((value) => {
        this.projetcOkString = value;
      });
      

      this.form = this.formBuilder.group({
        name_project:[this.projecto.name,Validators.required],
        description_project:[this.projecto.description,Validators.required],
        category_id:[this.projecto.category_id, Validators.required],
        spectator_id:[this.projecto.spectator_id,Validators.required],
      
      });
     // Watch the form for changes, and
      this.form.valueChanges.subscribe((v)=>{
        this.isReadyToSave= this.form.valid;
      });
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

  
    console.log('ionViewDidLoad EditprojectPage');
    
      let loading = this.loadingCtrl.create({
        content: 'Espera por favor...'
      });
      loading.present();
      this.authServiceProvider.getDataWithJWT('tags').subscribe((data)=>{
        
       
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

  done() {

    console.log("entro aca545");
    if (!this.form.valid) { return; }
    console.log(JSON.stringify(this.form.value));


    
    this.authServiceProvider.putDataJwt(JSON.stringify(this.form.value),"projects/"+this.projecto.id,"project") //ingresa en projects
    .subscribe(
      data => {
         console.log(data)
         let toast = this.toastCtrl.create({
          message: this.projetcOkString,
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

  cancel(){
   this.viewCtrl.dismiss();
  }

}
