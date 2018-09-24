import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { ThemeExposantsPage } from '../theme-exposants/theme-exposants';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the RechercheThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-theme',
  templateUrl: 'recherche-theme.html',
})
export class RechercheThemePage {

public themes:Array<{id:number,libelle:string}>


  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlPrd:RemoteSqlProvider) {
    this.themes=[];
    
    this.sqlPrd.select("SELECT * FROM `THEME` order by libelle",null,this.themes);
  }

  exposants(theme){
    this.navCtrl.push(ThemeExposantsPage,{item:theme});
  }
  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
