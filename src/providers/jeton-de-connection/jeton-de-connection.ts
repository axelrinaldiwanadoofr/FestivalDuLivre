import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the JetonDeConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JetonDeConnectionProvider 
{
  private connected: boolean ;
  private compte: string ;
  private droits: string ;

  private users: Array<{compte:string, password: string, droits: string }> ;

  constructor(public http: HttpClient) 
  {
    this.connected = false ;
    this.compte = null ;
    this.droits = null ;

    this.users = [
      {compte: "admin", password: "config@flc", droits: "admin" }
    ] ;
  }

  isConnected() : string
  {
    return this.droits ;
  }

  connect( compte: string, password: string ): string
  {
    let user = this.users.find( (u)=>
    {
      return u.compte == compte && u.password == password ;
    }) ;

    if( user )
    {
      this.compte = user.compte ;
      this.droits = user.droits ;
      return this.droits ;
    }
    return null ;
  }

  unConnect()
  {
    this.compte = null ;
    this.droits = null ;
    this.connected = false ;
  }

}
