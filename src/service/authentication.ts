import { Injectable } from '@angular/core'; //manejar la esctructura de la clase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
const identificador ="token";

@Injectable()

export class  Authentication{

    public token: string;

    constructor(private angularAuth: AngularFireAuth){
        this.setUp();
    }

    getUser(){
         //obtener datos del usuario actual
        let user = new Array(3);
        user[0]=this.angularAuth.auth.currentUser.uid;
        user[1]=this.angularAuth.auth.currentUser.displayName;
        user[2]=this.angularAuth.auth.currentUser.email;
        return user;

     }
    
    setUp(){
        this.token= this.getTokenFromLS(); //le asigna el valor de el valor de key actual
       // console.log("Escuchando el observador");
        
        this.angularAuth.authState.subscribe((firebaseUser)=>{ //mira el estado del usuario suscrito
         // console.log(firebaseUser);
          if(firebaseUser){ //si existe el usuario suscrito setea e localStorage sesion atual
              localStorage.setItem(identificador,firebaseUser.uid);
              this.token=firebaseUser.uid;
          }else{
              localStorage.removeItem(identificador);
              this.token=null;
          }
        });
    }
    getTokenFromLS() :string{

        //local storge funcion de javascript
           return localStorage.getItem(identificador);
           // trae le valor de la llave indetificador que este en ese momento local
       }
    //crear usuario con proveedor
    createUserWithProvider(provider){
        return this.angularAuth.auth.signInWithRedirect(provider)//redirige al proveedor
        .then(result => {
            console.log(" "+result);
            return firebase.auth().getRedirectResult();//retorna una promesa
            
        }).catch(error =>{
            console.log("eror a ocurrido")
        });
    }

    createUserWithGoogle():  Promise<any>{
        let provider = new firebase.auth.GoogleAuthProvider(); //trae el proveedor de google
        return this.angularAuth.auth.signInWithRedirect(provider);
    }

    createUserWithFacebook(){
        let provider = new firebase.auth.FacebookAuthProvider();
        this.createUserWithProvider(provider);
    }
    createUserWithEmailAndPassword(email,password): Promise<any>{
        return  this.angularAuth.auth.createUserWithEmailAndPassword(email,password);
    }

    login(email,password): Promise<any>{
        return this.angularAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email,password);

    }
    logOut(): Promise<any>{
      return this.angularAuth.auth.signOut().then(()=>{
          this.token=null;
      });  
    }
}