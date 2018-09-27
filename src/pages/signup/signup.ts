import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '..';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Authentication } from '../../service/authentication';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account:{ id_firebase: string,
   name: string, email: string, doc:string, password:string,password_confirmation:string,  
   user_type_id: number}={
    id_firebase:" ",
    name: " ",
    email: " ", 
    doc:" ",
     password:" ",
     password_confirmation:  " ",
    user_type_id: 0
    

   } ;

  //objeto rol recibido
  objetoRol: any;


  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User, public toastCtrl: ToastController,
    public translateService: TranslateService, public authServiceProvider: AuthServiceProvider,
    private auth: Authentication,public navParams: NavParams,
    public loadingCtrl: LoadingController ,
    public alertCtrl: AlertController) {
     // this.objetoRol = JSON.stringify(navParams.data);
      /*this.objetoRol = this.navParams.get("item")
      
      console.log("objeto recib"+this.objetoRol); */
      this.objetoRol = this.navParams.get("item");
      console.log("objeto r5ec22220ib"+this.objetoRol['id']); 


     // var stringify = JSON.parse(this.objetoRol);
      /*  for (var i = 0; i <this.objetoRol.length; i++) {
            console.log("gdfgfd"+this.objetoRol[i]['id']);
        }*/
     // console.log("objeto r5ec22220ib"+this.objetoRol[0]['id']); 
     // console.log("que trajo r{Ñ{o´+´+l "+this.objetoRol.title;

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
      
    })
  }

  doSignup2() {
    this.authServiceProvider.postData(this.account, "users")
    .subscribe(
      data => {
         this.navCtrl.push(MainPage)

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

  doSignup(){
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta. Por favor, espere...'
  });
  loading.present();

  this.auth.createUserWithEmailAndPassword('eri@prueba.com','123456789')
  .then(result => {
      loading.dismiss();
     
     
     
      if (result){
        console.log(this.auth.getUser()); 
        this.account.id_firebase=this.auth.getUser()[0]; 
        this.account.email=this.auth.getUser()[2];
        this.account.name ="prueba";
        this.account.password="123456789";
        this.account.password_confirmation="123456789";
        this.account.doc="1234567";
        this.account.user_type_id =this.objetoRol['id'];


        console.log(this.account);
        
        this.doSignup2();
          // this.navCtrl.push('CardsPage');
          
         };
        
        
      
      
  }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
  });
   // return this.auth.createUserWithGoogle();

    //this.auth().getRedirectResult().then(result => console.log(result));

    //this.auth.getUser();
    //console.log( this.auth.getUser());
  }
  createAccountWithFacebook(){
    this.auth.createUserWithFacebook();
    //alert("Ingreso");

  }


  

alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}



}
