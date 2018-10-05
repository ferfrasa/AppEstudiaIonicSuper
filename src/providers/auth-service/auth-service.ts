import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData2(data, url) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
     
    const options = { headers: headers };
    let json = JSON.stringify(data);
    console.log(json);
    let apiUrl=localStorage.getItem("apiUrl");
    let completeUrl=apiUrl + url ;
    console.log(json);
    return this.http.post(completeUrl, json, options);
  }
  postData(data, url) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
     
    const options = { headers: headers };

    let json = '{"user":'+JSON.stringify(data)+'}';
    console.log(json);
    let apiUrl=localStorage.getItem("apiUrl");
    let completeUrl=apiUrl + url ;
    console.log(json);
    return this.http.post(completeUrl, json, options);
  }
   
  postDataJwt(data, type, model) {
    let jwt=localStorage.getItem("jwt");//token de autorizacion
    let headers = new HttpHeaders( //cabecera
      {
        'Content-Type': 'application/json'
        ,
       'Authorization':'Bearer '+jwt
      });
     
    const options = { headers: headers };
     
    let json = '{"'+model +'":'+JSON.stringify(data)+'}'
    console.log(json);
    let apiUrl=localStorage.getItem("apiUrl");
    return this.http.post(apiUrl+type , json, options);
  }
  
  postDataJwt2(data, type, model)  {
     let jwt=localStorage.getItem("jwt");//token de autorizacion
     let headers = new HttpHeaders( //cabecera
       {
         'Content-Type': 'application/json'
         ,
        'Authorization':'Bearer '+jwt
       });
      
     const options = { headers: headers };
      
     let json = '{"'+model +'":'+data+'}'
     console.log(json);
     let apiUrl=localStorage.getItem("apiUrl");
     return this.http.post(apiUrl+type , json, options);
   }

  getData(uri) {
   // let jwt=localStorage.getItem("jwt");
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        //,
     ///   'Authorization':'Bearer '+jwt
      });
     
    const options = { headers: headers };
       
    let apiUrl=localStorage.getItem("apiUrl")+uri;
    console.log(apiUrl);
    return this.http.get(apiUrl.trim() ,options);
  }

  
  getDataWithJWT(uri) {
     let jwt=localStorage.getItem("jwt");
     let headers = new HttpHeaders(
       {
         'Content-Type': 'application/json'
         ,
        'Authorization':'Bearer '+jwt
       });
      
     const options = { headers: headers };
        
     let apiUrl=localStorage.getItem("apiUrl")+uri;
     console.log("     "+apiUrl);
     return this.http.get(apiUrl ,options);
   }

   getDataWithJWT2(uri,id) {
    let jwt=localStorage.getItem("jwt");
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
        ,
       'Authorization':'Bearer '+jwt
      });
     
    const options = { headers: headers };
       
    let apiUrl=localStorage.getItem("apiUrl")+uri+id;
    console.log("     "+apiUrl);
    return this.http.get(apiUrl ,options);
  }

 }
 


