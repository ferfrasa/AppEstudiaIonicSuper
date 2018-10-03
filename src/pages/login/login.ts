import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,AlertController, LoadingController } from 'ionic-angular';
import { Validators,FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { User } from '../../providers';
import { MainPage } from '../';
import { Authentication } from '../../service/authentication';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  credentials: FormGroup
  account: { email: string, password: string } = {
    email: "",
    password: ""
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private auth: Authentication,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public authServiceProvider:AuthServiceProvider) {

    this.credentials= this.formBuilder.group({
      email: new FormControl('', Validators.compose(
        [Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password:['', Validators.required]
    });
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    let userData={
      auth:{
        email:this.credentials.value.email,
        password:this.credentials.value.password
      }
    }
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    this.auth.login(this.credentials.value.email,this.credentials.value.password).then(result =>{
      this.authServiceProvider.postData2(userData,"user_token")
      .subscribe(data=>{
        console.log(JSON.stringify(data));
        localStorage.setItem('user',JSON.stringify(data["user"]));
        localStorage.setItem('jwt',data["jwt"]);
        loading.dismiss();
     
        this.navCtrl.push(MainPage);
      })

    }).catch(error=>{
      loading.dismiss();
        console.log(error);
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    })

   /* this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }
  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
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
