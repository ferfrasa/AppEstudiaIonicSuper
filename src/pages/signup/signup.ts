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

  doSignup2() {
    this.authServiceProvider.postData(this.account, "users")
    .subscribe(
      data => {
        let userData={
          auth:{
            email:this.account.email,
            password:this.account.password
          }
        }
        this.authServiceProvider.postData2(userData,"user_token")
        .subscribe(data=>{
          console.log(JSON.stringify(data));
        localStorage.setItem('user',JSON.stringify(data["user"]));
        localStorage.setItem('jwt',data["jwt"]);
        localStorage.setItem('name',data['name']);
        console.log(localStorage.getItem('name'));



       /* {"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mzg2MDE4NzgsInN1YiI6MjF9.M0ltTsKFYQKf4bynZsS8g7nPspxx9yT_v5quYpdqmAE",
        "user":{"id":21,"name":" Lider","email":"lider@prueba.com","doc":null,"password_digest":"$2a$10$jWNNfhfEt/6TCjZ.FB26TuitXYUYrgHOr/7eydGPxjL3d0vtGsEPG","user_type_id":40,"university_id":5,"created_at":"2018-09-27T15:50:37.185Z","updated_at":"2018-09-27T15:50:37.185Z","token":"3affabbc3416be07b82ce73c91e15867","status_user":true,"id_firebase":"6NJPTzx4wefVwsyIDcpYbIaoMdU2"}}*/
        //localStorage.*
        this.navCtrl.push(MainPage);

        })
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

    this.auth.createUserWithEmailAndPassword(this.account.email, this.account.password)
    .then(result => {
      loading.dismiss(); 
     
      if (result){
        
        console.log(this.auth.getUser()); 
        this.account.id_firebase=this.auth.getUser()[0]; 
        this.account.email=this.auth.getUser()[2];
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
    /**
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
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
