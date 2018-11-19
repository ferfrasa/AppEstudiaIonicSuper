import { LiderColegio } from './../index';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, MenuController,NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '..';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Authentication } from '../../service/authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
   //datos de la cuenta
  
  account:{ id_firebase: string,
    name: string, email: string,  password:string,password_confirmation:string,  
    user_type_id: number}={
    id_firebase:" ",
    name: " ",
    email: " ", 
    password:"",
    password_confirmation:  "",
    user_type_id: 0
   } ;

  

  //objeto rol recibido de pagina de rol
   objetoRol: any;


  // Our translated text strings
  private signupErrorString: string;
   formularioUsuario:FormGroup;


  constructor(public navCtrl: NavController,
    public user: User, 
    public toastCtrl: ToastController,
    public translateService: TranslateService, 
    public authServiceProvider: AuthServiceProvider,
    private auth: Authentication,
    public navParams: NavParams,
    public loadingCtrl: LoadingController ,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    public menu:MenuController) {
    
      this.objetoRol = this.navParams.get("item"); // obtiene los parametros de la pagina rol
      console.log("objeto r5ec22220ib"+this.objetoRol['id']); 
      this.buildForm();

      this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

  
  }

  doSignup2(loading) {
    return this.authServiceProvider.postData(this.account, "users")
    .subscribe(
      data => {
        let userData={
          auth:{
            email:this.account.email,
            password:this.account.password
          }
        }
        return this.authServiceProvider.postData2(userData,"user_token")
        .subscribe(data=>{
          console.log(JSON.stringify(data));
          localStorage.setItem('user',JSON.stringify(data["user"]["id"]));
          localStorage.setItem('name',JSON.stringify(data["user"]["name"]));
          localStorage.setItem('email',JSON.stringify(data["user"]["email"]));
          localStorage.setItem('user_type',JSON.stringify(data["user"]["user_type_id"]));
          localStorage.setItem('university',JSON.stringify(data["user"]["university_id"]));
          localStorage.setItem('status',JSON.stringify(data["user"]["status_user"]));
          localStorage.setItem('jwt',data["jwt"]);
          loading.dismiss();
         this.navCtrl.push(MainPage);
        })
      },
      err => { console.log(err); 
        loading.dismiss();
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

    this.auth.createUserWithEmailAndPassword(this.account.email, this.account.password)
    .then(result => {
        console.log(this.auth.getUser()); 
        this.account.id_firebase=this.auth.getUser()[0]; 
        this.account.email=this.auth.getUser()[2];
        this.account.user_type_id =this.objetoRol['id'];
        console.log(this.account);
        this.doSignup2(loading);
        //loading.dismiss(); 
          // this.navCtrl.push('CardsPage');
      
    }).catch(error => {
        loading.dismiss();
        console.log(error);
        /*code: "auth/network-request-failed"
        code: "auth/email-already-in-use"code: 
        "auth/email-already-in-use"

        auth/invalid-email
        message: "A network error (such as timeout, interr*/



        this.alert('Error', error);
      });
   }
        // return this.auth.createUserWithGoogle();

          //this.auth().getRedirectResult().then(result => console.log(result));

          //this.auth.getUser();
          //console.log( this.auth.getUser());
  
  createAccountWithFacebook(){
    this.auth.createUserWithFacebook();
    //alert("Ingreso");
  }
  compararPassword(){
    if(this.account.password !== this.account.password_confirmation){
      this.alert("Error", "Las contraseñas no coinciden")
    }
  }
  
  alert(title: string, message: string) {
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }
  buildForm() {
    this.formularioUsuario = this.fb.group({
      name:['',[Validators.required,Validators.maxLength(30)]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      password_confirmation:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      email:['',[Validators.required,Validators.email]]
    });
  }
  ionViewDidLoad(){
    this.menu.enable(false);
  }
 
  ionViewWillEnter(){
    let user=localStorage.getItem("user");
    let jwt=localStorage.getItem("jwt");
    let token=localStorage.getItem("token");
    if(user && jwt && token  ){
        this.navCtrl.setRoot(MainPage);
    }
  }

}
